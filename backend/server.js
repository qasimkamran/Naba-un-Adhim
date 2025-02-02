import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './src/config/db.js';
import chapterRoutes from './src/features/chapters/chapterRoutes.js';

// * MongoDB Connection
dotenv.config();
connectDB();

const app = express();

// * Middleware
app.use(cors());
app.use(express.json());

// * API Routes
app.use('/api/chapters', chapterRoutes);

// * Start Server
const PORT = process.env.PORT;
app.listen(PORT, '0.0.0.0', () => console.log(`Server listening on PORT: ${PORT}`));

