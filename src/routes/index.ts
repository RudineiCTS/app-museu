import { Router } from 'express';

import exposureRouter from './exposures.routes';
import thematicRouter from './thematics.routes';

const routes = Router();

routes.use('/exposures', exposureRouter);
routes.use('/thematic', thematicRouter);

export default routes;
