import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { Door } from '@/models/Door';
import { DataGrid, GridColDef, GridRowParams } from '@mui/x-data-grid';
import Typography from '@mui/material/Typography';
import formatTimestamp from './utils/formatTimestamp';
import connectionStatusColor from './utils/connectionStatusColor';

interface DoorListProps {
  doors: Door[];
}

const columns: GridColDef<Door>[] = [
  {
    field: 'name',
    headerName: 'Name',
    flex: 1,
  },
  {
    field: 'buildingName',
    headerName: 'Building',
    flex: 1,
  },
  {
    field: 'connectionType',
    headerName: 'Connection type',
    flex: 1,
  },
  {
    field: 'connectionStatus',
    headerName: 'Connection status',
    flex: 1,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    renderCell: ({ row: door }) => {
      return (
        <Typography
          sx={{
            color: connectionStatusColor(door.connectionStatus),
          }}
        >
          {door.connectionStatus}
        </Typography>
      );
    },
  },
  {
    field: 'apartmentName',
    headerName: 'Apartment name',
    flex: 1,
  },
  {
    field: 'lastConnectionStatusUpdate',
    headerName: 'Last connection status',
    flex: 1,
    renderCell: ({ row: door }) => {
      return formatTimestamp(door.lastConnectionStatusUpdate);
    },
  },
];

export function DoorList({ doors }: DoorListProps) {
  const router = useRouter();

  const onDoorRowClick = useCallback(
    (gridRow: GridRowParams<Door>) => {
      router.push({
        pathname: '/doors/[doorId]',
        query: { doorId: gridRow.id },
      });
    },
    [router],
  );

  return (
    <DataGrid
      autoHeight
      hideFooter
      rows={doors}
      columns={columns}
      disableRowSelectionOnClick
      onRowClick={onDoorRowClick}
    />
  );
}
