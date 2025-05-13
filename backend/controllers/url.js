import { nanoid } from 'nanoid';
import validUrl from 'valid-url';
import Url from '../models/Url.js';  // Ensure you use .js extension in imports for ES Modules

const baseUrl = process.env.BASE_URL || 'http://localhost:5000';

export const shortenUrl = async (req, res) => {
  const { longUrl } = req.body;

  if (!validUrl.isUri(longUrl)) {
    return res.status(400).json({ success: false, message: 'Invalid URL' });
  }

  try {
    // If user is authenticated, look for their existing URL
    let url;
    if (req.userId) {
      url = await Url.findOne({ longUrl, user: req.userId });
    } else {
      url = await Url.findOne({ longUrl, user: null });
    }

    if (url) {
      return res.json({ success: true, url });
    }

    const urlCode = nanoid(6);
    const shortUrl = `${baseUrl}/${urlCode}`;

    // Create new URL, including user reference if authenticated
    const urlData = { 
      urlCode, 
      longUrl, 
      shortUrl 
    };

    // Add user to the URL if authenticated
    if (req.userId) {
      urlData.user = req.userId;
    }

    url = new Url(urlData);
    console.log("new url object ::", url);
    await url.save();

    res.json({ success: true, url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const redirectUrl = async (req, res) => {
  try {
    const url = await Url.findOne({ urlCode: req.params.code });

    console.log("url ::", url);

    if (url) {
      url.clicks++;
      await url.save();
      return res.redirect(url.longUrl);
    } else {
      return res.status(404).json({ success: false, message: 'URL not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const getAllUrls = async (req, res) => {
  try {
    let urls;
    
    // If authenticated, get only user's URLs
    if (req.userId) {
      urls = await Url.find({ user: req.userId }).sort({ createdAt: -1 });
    } else {
      // For unauthenticated users or for admin routes that need all URLs
      urls = await Url.find().sort({ createdAt: -1 });
    }
    
    res.json({ success: true, urls });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Get user's URLs (protected route)
export const getUserUrls = async (req, res) => {
  try {
    const urls = await Url.find({ user: req.userId }).sort({ createdAt: -1 });
    res.json({ success: true, urls });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
