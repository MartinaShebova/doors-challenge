import { render } from '@testing-library/react';
import { Door } from '@/models/Door';
import { DoorList } from './DoorList';
import { NOT_APPLICABLE_ABBREVIATION } from '@/utils/constants';

jest.mock('next/router', () => require('next-router-mock'));

const doors: Door[] = [
  {
    id: '63f637c9f3c48a124616044b',
    name: 'Building Main Entrance',
    buildingName: 'Bahnhofstrasse 10A',
    connectionType: 'wired',
    connectionStatus: 'offline',
    lastConnectionStatusUpdate: '2023-02-22T03:00:11.853Z',
    apartmentId: NOT_APPLICABLE_ABBREVIATION,
    apartmentName: NOT_APPLICABLE_ABBREVIATION,
  },
];

describe('DoorList', () => {
  it('should render correctly', () => {
    const { container } = render(<DoorList doors={doors} />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
