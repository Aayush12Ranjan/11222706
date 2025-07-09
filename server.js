import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import shortenerRoutes from './route/Shortner.js';


const PORT=5000;


const app = express();
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/urlshort")
  .then(() => console.log('Database connected'))
  .catch((err) => console.error('Connection error:', err));

app.use('/', shortenerRoutes);


app.listen(PORT, () => console.log(`Server running at port http://localhost:${PORT}`));
