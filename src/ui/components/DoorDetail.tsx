import Typography from '@mui/material/Typography';
import { Door } from '@/models/Door';
import { DetailPageContainer } from '@/ui/layout/DetailPageContainer';
import { DetailPageItem } from '@/ui/layout/DetailPageItem';
import formatTimestamp from './utils/formatTimestamp';
import connectionStatusColor from './utils/connectionStatusColor';

interface DoorDetailProps {
  door: Door;
}

export function DoorDetail({ door }: DoorDetailProps) {
  return (
    <DetailPageContainer>
      <DetailPageItem label="ID">
        <Typography>{door.id}</Typography>
      </DetailPageItem>
      <DetailPageItem label="Building">
        <Typography>{door.buildingName}</Typography>
      </DetailPageItem>
      <DetailPageItem label="Connection type">
        <Typography>{door.connectionType}</Typography>
      </DetailPageItem>
      <DetailPageItem label="Connection status">
        <Typography
          color={`${
            connectionStatusColor(door.connectionStatus)
          }`}
        >
          {door.connectionStatus}
        </Typography>
      </DetailPageItem>
      <DetailPageItem label="Apartment name">
        <Typography>{door.apartmentName}</Typography>
      </DetailPageItem>
      <DetailPageItem label="Last connection status">
        <Typography>
          {formatTimestamp(door.lastConnectionStatusUpdate)}
        </Typography>
      </DetailPageItem>
    </DetailPageContainer>
  );
}
