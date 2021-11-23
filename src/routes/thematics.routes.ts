import { Router } from 'express';

import CreateThematicService from '../services/CreateThematicService';
import ListAllExposureWithThematic from '../services/ListAllExposureWithThematic';
import ListThematicService from '../services/ListThematicService';

const thematicRouter = Router();

thematicRouter.post('/', async (request, response) => {
  const { title, subtitle, description } = request.body;

  const createThematicService = new CreateThematicService();

  const newThematic = await createThematicService.execute({
    title,
    subtitle,
    description,
  });

  response.json(newThematic);
});

thematicRouter.get('/', async (request, response) => {
  const listThematicService = new ListThematicService();
  const thematicList = await listThematicService.execute();

  response.json(thematicList);
});

thematicRouter.get('/exposures', async (request, response) => {
  const listAllExposureWithThematic = new ListAllExposureWithThematic();
  const thematicList = await listAllExposureWithThematic.execute();

  response.json(thematicList);
});

export default thematicRouter;
