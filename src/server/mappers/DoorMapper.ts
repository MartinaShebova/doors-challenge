import { Door } from '@/models/Door';
import { injectable } from 'tsyringe';
import { EntityMapper } from '@/server/lib/EntityMapper';
import { DoorDto } from '@/__mocks__/dtos/DoorDto';
import { BuildingDtosById } from '@/__mocks__/dtos/BuildingDtoById';
import { ApartmentDtosById } from '@/__mocks__/dtos/ApartmentDtosById';
import { NOT_APPLICABLE_ABBREVIATION } from '../constants';

@injectable()
export class DoorMapper implements EntityMapper<Door, DoorDto> {
  public toDomain(doorDto: DoorDto, allData: {buildingDtosById?: BuildingDtosById, apartmentDtosById?: ApartmentDtosById}): Door {
    const buildingName = this.getBuildingName(
      doorDto.building_id,
      allData.buildingDtosById
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
    return id && apartmentDtosById ? apartmentDtosById[id].name : NOT_APPLICABLE_ABBREVIATION;
  }

  private getBuildingName(id: string, buildingDtos?: BuildingDtosById) {
    const building = buildingDtos ? buildingDtos[id] : undefined;

    return building ? `${building.street} ${building.street_no}` : NOT_APPLICABLE_ABBREVIATION;
  }
}
