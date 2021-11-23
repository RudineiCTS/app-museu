import { getRepository } from 'typeorm';
import Exposure from '../models/Exposure';

class ShowUniqueItem {
  public async execute(id: string): Promise<Exposure | undefined> {
    const exposureRepository = getRepository(Exposure);

    const exposure = await exposureRepository.findOne(id);

    return exposure;
  }
}
export default ShowUniqueItem;
