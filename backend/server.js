import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import urlRoutes from './routes/url.js'; 
import redirectRoutes from "./routes/redirectRoutes.js";
import authRoutes from './routes/auth.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: "https://sniper-phi.vercel.app",
  credentials: true
}));
app.options('*', cors({
  origin: "https://sniper-phi.vercel.app",
  credentials: true
}));

app.use(express.json());

// Routes
app.use('/api', urlRoutes);
app.use('/api/auth', authRoutes);
app.use('/', redirectRoutes);


const uri = process.env.MONGO_URI || "";

mongoose.connect(uri)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB', err);
  });
