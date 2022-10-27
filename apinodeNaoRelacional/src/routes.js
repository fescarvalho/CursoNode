import { Router } from 'express';
import SessionController from './controllers/SessionController';
import HouseController from './controllers/HouseController';
import DashboardController from './controllers/DashboardController';
import multer from 'multer';
import uploadConfig from './config/uploadConfig';
import ReserveController from './controllers/ReserveController';

const routes = new Router();
const upload = multer(uploadConfig);

/* Session */
routes.post('/sessions', SessionController.store);

/* Dashboard */
routes.get('/dashboard', DashboardController.show);

/* House */
routes.get('/houses', HouseController.index);
routes.delete('/houses', HouseController.destroy);
routes.post('/houses', upload.single('thumbnail'), HouseController.store);
routes.put(
  '/houses/:house_id',
  upload.single('thumbnail'),
  HouseController.update
);

/* Reserve */
routes.post('/houses/:house_id/reserve', ReserveController.store);
routes.get('/reserves', ReserveController.index);
routes.delete('/reserves/cancel', ReserveController.destroy);
export default routes;
