import express, { Router } from 'express';
import { ideasRouter } from './ideas';

let apiRouter = express.Router();

apiRouter.use('/ideas' , ideasRouter);

export default apiRouter;
