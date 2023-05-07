/* eslint-disable import/extensions */
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import studentRoutes from './routes/studentRoutes.js';
import resultRoutes from './routes/resultRoutes.js';
import courseRoutes from './routes/courseRoutes.js';

const app = express();
dotenv.config();
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use('/api/student', studentRoutes);
app.use('/api/result', resultRoutes);
app.use('/api/course', courseRoutes);

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('Student Result Management System is running!');
});
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
  .catch((error) => console.log('Error while connecting to the mongoDB server', error.message));
