import React from 'react';
import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { columns, rows } from '../data/data.ts';

const ReservationTable: React.FC = () => {
  return (
    <Box style={{ height: '100%', width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        disableColumnResize={true}
        disableColumnMenu={true}
        disableColumnSorting={true}
        rowHeight={25}
        sx={{
          '& .MuiDataGrid-virtualScrollerRenderZone': {
            backgroundImage: 'url("Reservita/images/tk_borac_logo_bw.png")',
            backgroundSize: 'contain',
            backgroundPosition: 'center calc(50% + 2vh)',
            backgroundRepeat: 'no-repeat',
          },
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: 'transparent',
            color: '#000',
          },
          '& .MuiDataGrid-footerContainer': {
            display: 'none', // Hide the pagination controls
          },
        }}
      />
    </Box>
  );
};

export default ReservationTable;
