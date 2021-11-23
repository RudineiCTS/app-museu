import { getRepository } from 'typeorm';
import AppError from '../errors/AppError';
import Thematic from '../models/Thematic';
import Exposure from '../models/Exposure';

interface RequestDTO {
  title: string;
  subtitle: string;
  description: string;
  thematic_id: string;
  urlImage: string;
}

class CreateExposureService {
  public async execute({
    title,
    subtitle,
    description,
    thematic_id,
    urlImage,
  }: RequestDTO): Promise<Exposure> {
    const exposureRepository = getRepository(Exposure);
    const thematicRepository = getRepository(Thematic);

    const verifySameExposure = await exposureRepository.findOne({ title });

    if (verifySameExposure) {
      throw new AppError('is exposure exists');
    }

    const verifyThematicId = await thematicRepository.findOne({
      where: {
        id: thematic_id,
      },
    });
    if (!verifyThematicId) {
      throw new AppError('does not exists thematic');
    }
    const exposure = exposureRepository.create({
      title,
      subtitle,
      description,
      thematic_id,
      urlImage,
    });

    await exposureRepository.save(exposure);
    return exposure;
  }
}

export default CreateExposureService;
