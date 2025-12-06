import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import contactsRouter from './routes/contacts';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/api/contacts', contactsRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Chameleon Contacts backend running on port ${PORT}`);
});
