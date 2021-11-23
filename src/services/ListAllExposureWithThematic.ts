import { getRepository } from 'typeorm';
// import Exposure from '../models/Exposure';
import Thematic from '../models/Thematic';

interface Response {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  exposure: {
    title: string;
    subtitle: string;
    description: string;
    urlImage: string;
    thematic_id: string;
  }[];
}

class ListAllExposureWithThematic {
  public async execute(): Promise<Response[]> {
    const thematicRepository = getRepository(Thematic);

    const thematicList = await thematicRepository.find({
      relations: ['exposure'],
    });

    return thematicList;
  }
}
export default ListAllExposureWithThematic;
