import express from 'express';
import sendEmailRoute from './send-email.js';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json()); // For parsing JSON body
app.use('/api', sendEmailRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
