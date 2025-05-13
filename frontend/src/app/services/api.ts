// API base URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export interface UrlData {
  _id: string;
  longUrl: string;
  shortUrl: string;
  urlCode: string;
  clicks: number;
  createdAt: string;
  user?: string;
}

export interface ApiResponse {
  success: boolean;
  url?: UrlData;
  urls?: UrlData[];
  message?: string;
}

/**
 * Shorten a URL
 * @param longUrl - The URL to shorten
 * @param token - Optional JWT token for authenticated requests
 * @returns The API response with the shortened URL data
 */
export async function shortenUrl(longUrl: string, token?: string | null): Promise<ApiResponse> {
  try {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    // Add Authorization header if token is provided
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}/shorten`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ longUrl }),
    });

    return await response.json();
  } catch (error) {
    console.error('Error shortening URL:', error);
    return {
      success: false,
      message: 'Failed to shorten URL. Please try again later.',
    };
  }
}

/**
 * Get all URLs (public or admin route)
 * @returns The API response with all URLs
 */
export async function getAllUrls(): Promise<ApiResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/urls/all`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching URLs:', error);
    return {
      success: false,
      message: 'Failed to fetch URLs. Please try again later.',
    };
  }
}

/**
 * Get URLs for the authenticated user
 * @param token - JWT token
 * @returns The API response with the user's URLs
 */
export async function getUserUrls(token: string): Promise<ApiResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/urls/me`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return await response.json();
  } catch (error) {
    console.error('Error fetching user URLs:', error);
    return {
      success: false,
      message: 'Failed to fetch your URLs. Please try again later.',
    };
  }
} 