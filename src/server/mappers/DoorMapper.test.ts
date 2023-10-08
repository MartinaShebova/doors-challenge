import { BuildingDto } from '@/__mocks__/dtos/BuildingDto';
import { DoorDto } from '@/__mocks__/dtos/DoorDto';
import { Door } from '@/models/Door';
import { DoorMapper } from './DoorMapper';
import { NOT_APPLICABLE_ABBREVIATION } from '../constants';
import { BuildingDtosById } from '@/__mocks__/dtos/BuildingDtoById';

const buildingDto: BuildingDto = {
  id: '63f4e0797e85310fee059022',
  street: 'Bahnhofstrasse',
  street_no: '10A',
  zip: '8000',
  city: 'Zurich',
};

const doorDto: DoorDto = {
  id: '63f4d82ef04826419cc6eaeb',
  name: 'Building Main Entrance',
  connection_type: 'wired',
  connection_status: 'online',
  last_connection_status_update: '2023-02-22T02:38:40.374Z',
  building_id: buildingDto.id,
};

describe('DoorMapper', () => {
  let doorMapper: DoorMapper;
  let buildingDtosById: BuildingDtosById;

  beforeEach(() => {
    doorMapper = new DoorMapper();

    buildingDtosById = {
      [buildingDto.id]: buildingDto
    }
  });

  it('should map dto to Door model', () => {

    const door = doorMapper.toDomain(doorDto, {
      buildingDtosById
    });

    expect(door).toMatchObject<Door>({
      id: doorDto.id,
      name: doorDto.name,
      buildingName: `${buildingDto.street} ${buildingDto.street_no}`,
      connectionType: doorDto.connection_type,
      connectionStatus: doorDto.connection_status,
      lastConnectionStatusUpdate: doorDto.last_connection_status_update,
    });
  });

  it('should set building name to "n/a" if no matching building is found', () => {
    const door = doorMapper.toDomain(doorDto, {});

    expect(door).toMatchObject<Door>({
      id: doorDto.id,
      name: doorDto.name,
      buildingName: NOT_APPLICABLE_ABBREVIATION,
      connectionType: doorDto.connection_type,
      connectionStatus: doorDto.connection_status,
      lastConnectionStatusUpdate: doorDto.last_connection_status_update,
    });
  });
});
