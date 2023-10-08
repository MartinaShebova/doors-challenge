import { Door } from '@/models/Door';
import { injectable } from 'tsyringe';
import { EntityMapper } from '@/server/lib/EntityMapper';
import { DoorDto } from '@/__mocks__/dtos/DoorDto';
import { BuildingDtosById } from '@/__mocks__/dtos/BuildingDtoById';
import { ApartmentDtosById } from '@/__mocks__/dtos/ApartmentDtosById';

@injectable()
export class DoorMapper implements EntityMapper<Door, DoorDto> {
  public toDomain(doorDto: DoorDto, allData: {buildingDtosById: BuildingDtosById, apartmentDtosById?: ApartmentDtosById}): Door {
    const buildingName = this.getBuildingName(
      allData.buildingDtosById,
      doorDto.building_id,
    );

    const apartmentName = this.getApartmentName(
      allData.apartmentDtosById,
      doorDto.apartment_id,
    );
    
    return {
      id: doorDto.id,
      name: doorDto.name,
      buildingName,
      connectionType: doorDto.connection_type,
      connectionStatus: doorDto.connection_status,
      lastConnectionStatusUpdate: doorDto.last_connection_status_update,
      apartmentId: doorDto.apartment_id,
      apartmentName: apartmentName
    };
  }

  private getApartmentName(apartmentDtosById: ApartmentDtosById | undefined, id?: string) : string{
    return id && apartmentDtosById ? apartmentDtosById[id].name : 'n/a';
  }

  private getBuildingName(buildingDtos: BuildingDtosById, id: string) {
    const building = buildingDtos[id];

    return building ? `${building.street} ${building.street_no}` : 'n/a';
  }
}
