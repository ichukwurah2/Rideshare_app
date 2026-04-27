import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import sequelize from './models';
import apiRouter from './routes';
import { errorHandler } from './utils/errorHandler';

dotenv.config();

const app = express();
const port = Number(process.env.PORT || 5000);

app.use(cors());
app.use(express.json());

app.get('/', (_, res) => {
  res.json({
    status: 'ok',
    message: 'RideFlow backend is running',
  });
});

app.use('/api', apiRouter);
app.use(errorHandler);

async function startServer() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log('Database connection established successfully.');
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  } catch (error) {
    console.error('Unable to start the server:', error);
    process.exit(1);
  }
}

startServer();
