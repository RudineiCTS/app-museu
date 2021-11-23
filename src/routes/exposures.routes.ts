import { Router } from 'express';
import validator from 'validator';
import multer from 'multer';

import uploadConfig from '../config/upload';
import AppError from '../errors/AppError';
import CreateExposureService from '../services/CreateExposureService';
import ListExposureOfUniqueThematic from '../services/ListExposureOfUniqueThematic';
import ShowUniqueItem from '../services/ShowUniqueItem';

const exposureRouter = Router();

const upload = multer(uploadConfig);

exposureRouter.post('/', upload.single('file'), async (request, response) => {
  const { title, subtitle, description, thematic_id } = request.body;
  const urlImage = request.file.path;

  const createExposureService = new CreateExposureService();

  const verifyUUID = validator.isUUID(thematic_id);
  if (verifyUUID === false) {
    throw new AppError('thematic_id does not match with uuid');
  }
  const newExposure = await createExposureService.execute({
    title,
    subtitle,
    description,
    urlImage,
    thematic_id,
  });

  response.json(newExposure);
});

exposureRouter.get('/:id', async (request, response) => {
  const { id } = request.params;

  const listExposureOfUniqueThematic = new ListExposureOfUniqueThematic();
  const exposureList = await listExposureOfUniqueThematic.execute(id);
  response.json(exposureList);
});

exposureRouter.get('/unique/:id', async (request, response) => {
  const { id } = request.params;

  const showUniqueItem = new ShowUniqueItem();
  const exposure = await showUniqueItem.execute(id);
  response.json(exposure);
});

export default exposureRouter;
