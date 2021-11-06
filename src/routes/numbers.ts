import { Router } from 'express';
import { NumbersController } from '../controllers';

const routes = Router();

const numbersController = new NumbersController();

routes.get('/numbers', numbersController.getNumbers);

export default routes;
