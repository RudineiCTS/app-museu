import { getRepository } from 'typeorm';
import Exposure from '../models/Exposure';

class ListExposureOfUniqueThematic {
  public async execute(id: string): Promise<Exposure[]> {
    const exposureRepository = getRepository(Exposure);

    const exposureList = await exposureRepository.find({
      where: { thematic_id: id },
    });

    return exposureList;
  }
}
export default ListExposureOfUniqueThematic;
