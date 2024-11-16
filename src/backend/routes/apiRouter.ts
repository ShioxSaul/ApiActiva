import Express from 'express';
import userRouter from './userRouter.js';
import animalRouter from './animalRouter.js';

const apiRouter = Express.Router();

apiRouter.use('/users', userRouter);
apiRouter.use('/animals', animalRouter);

export default apiRouter;