import { Router } from 'express';
import NumbersRoutes from './numbers';

const routes = Router();

routes.use(NumbersRoutes);

export default routes;
