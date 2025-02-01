import { GridColDef } from '@mui/x-data-grid';

export const columns: GridColDef[] = [
  {
    field: 'time',
    headerName: 'Vrijeme',
    editable: false,
    maxWidth: 70,
    flex: 0,
  },
  {
    field: 'court1',
    headerName: 'Teren 1',
    editable: false,
    flex: 1,
  },
  {
    field: 'court2',
    headerName: 'Teren 2',
    editable: false,
    flex: 1,
  },
  {
    field: 'court3',
    headerName: 'Teren 3',
    editable: false,
    flex: 1,
  },
  {
    field: 'court4',
    headerName: 'Teren 4',
    editable: false,
    flex: 1,
  },
];
