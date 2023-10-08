import { render } from '@testing-library/react';
import { Door } from '@/models/Door';
import { DoorDetail } from './DoorDetail';
import { NOT_APPLICABLE_ABBREVIATION } from '@/utils/constants';

const door: Door = {
  id: '63f637c9f3c48a124616044b',
  name: 'Building Main Entrance',
  buildingName: 'Bahnhofstrasse 10A',
  connectionType: 'wired',
  connectionStatus: 'online',
  lastConnectionStatusUpdate: '2023-02-22T03:00:11.853Z',
  apartmentId: NOT_APPLICABLE_ABBREVIATION,
  apartmentName: NOT_APPLICABLE_ABBREVIATION,
};

describe('DoorDetail', () => {
  it('should render correctly', () => {
    const { container } = render(<DoorDetail door={door} />);

    expect(container.firstChild).toMatchSnapshot();
  });
});
