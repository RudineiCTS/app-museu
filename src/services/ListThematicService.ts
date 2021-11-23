import { getRepository } from 'typeorm';
import Thematic from '../models/Thematic';

class ListThematicService {
  public async execute(): Promise<Thematic[]> {
    const thematicRepository = getRepository(Thematic);

    const thematicList = await thematicRepository.find();

    return thematicList;
  }
}
export default ListThematicService;
