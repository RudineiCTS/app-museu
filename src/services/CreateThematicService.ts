import { getRepository } from 'typeorm';
import AppError from '../errors/AppError';
import Thematic from '../models/Thematic';

interface RequestDTO {
  title: string;
  subtitle: string;
  description: string;
}

class CreateThematicService {
  public async execute({
    title,
    subtitle,
    description,
  }: RequestDTO): Promise<Thematic> {
    const thematicRepository = getRepository(Thematic);

    const verifySameThematic = await thematicRepository.findOne({ title });
    if (verifySameThematic) {
      throw new AppError('thematic a ready exists');
    }
    const thematic = thematicRepository.create({
      title,
      subtitle,
      description,
    });
    await thematicRepository.save(thematic);
    return thematic;
  }
}
export default CreateThematicService;
