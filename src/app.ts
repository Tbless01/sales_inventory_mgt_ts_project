import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes/routes';
import { whitelistMiddleware } from './middleware/authMiddleware';

const app = express();
app.use(bodyParser.json());
app.use('/api', routes);

// app.use(whitelistMiddleware);

export default app;
