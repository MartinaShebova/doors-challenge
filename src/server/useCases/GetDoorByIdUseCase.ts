import { injectable } from 'tsyringe';
import createHttpError from 'http-errors';
import { Door } from '@/models/Door';
import { UseCase } from '@/server/lib/UseCase';
import { DoorRepository } from '@/server/repositories/DoorRepository';
import { BuildingRepository } from '@/server/repositories/BuildingRepository';
import { ApartmentRepository } from '../repositories/ApartmentRepository';
import { DoorMapper } from '@/server/mappers/DoorMapper';
import { ApartmentDto } from '@/__mocks__/dtos/ApartmentDto';
import { ApartmentDtosById } from '@/__mocks__/dtos/ApartmentDtosById';
import { BuildingDtosById } from '@/__mocks__/dtos/BuildingDtoById';

interface Context {
  doorId: string;
}

@injectable()
export class GetDoorByIdUseCase implements UseCase<Door, Context> {
  constructor(
    private doorRepository: DoorRepository,
    private buildingRepository: BuildingRepository,
    private apartmentRepository: ApartmentRepository,
    private doorMapper: DoorMapper,
  ) {}

  public async execute({ doorId }: Context) {
    const doorDto = await this.doorRepository.getDoorById(doorId);

    if (!doorDto) {
      throw new createHttpError.NotFound(`no door found for id ${doorId}`);
    }

    const buildingDto = await this.buildingRepository.getBuildingById(
      doorDto.building_id,
    );

    if (!buildingDto) {
      throw new createHttpError.NotFound(
        `no building found for id ${doorDto.building_id}`,
      );
    }

    let apartmentDto: ApartmentDto | undefined = undefined;

    if (doorDto.apartment_id) {
      apartmentDto = await this.apartmentRepository.getApartmentById(
        doorDto.apartment_id,
      );
    }

    let apartmentDtosById: ApartmentDtosById | undefined = undefined;

    if (apartmentDto) {
      apartmentDtosById = { [apartmentDto.id]: apartmentDto };
    }

    const buildingDtosById: BuildingDtosById = {
      [buildingDto.id]: buildingDto,
    };

    return this.doorMapper.toDomain(doorDto, {
      buildingDtosById,
      apartmentDtosById,
    });
  }
}
