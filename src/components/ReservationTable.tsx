import React, { useState } from 'react';
import { Box } from '@mui/material';
import { DataGrid, GridRowsProp } from '@mui/x-data-grid';
import NewReservationDialog from './NewReservationDialog.tsx';
import { columns } from '../data/data.ts';
import { generateTimeRange } from '../helpers/timeHelper.ts';
import { Reservation } from '../models/Reservation.ts';

const ReservationTable: React.FC = () => {
  const timeRange = generateTimeRange(7, 23, 30);

  const [rows, setRows] = useState<GridRowsProp>(
    timeRange.map((time, index) => ({
      id: index + 1,
      time,
      court1: '',
      court2: '',
      court3: '',
      court4: '',
    })),
  );

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedStartTime, setSelectedStartTime] = useState('');
  const [selectedCourt, setSelectedCourt] = useState('');

  const handleCellClick = (params: any) => {
    const selectedTime = params.row.time;
    setSelectedStartTime(selectedTime);
    const court = params.field;
    setSelectedCourt(court);
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleConfirmReservation = (reservation: Reservation) => {
    setOpenDialog(false);

    const timeToMinutes = (time: string): number => {
      const [hour, minute] = time.split(':').map(Number);
      return hour * 60 + minute;
    };

    const startMinutes = timeToMinutes(reservation.startTime);
    const endMinutes = timeToMinutes(reservation.endTime);

    // Find the range of rows to highlight
    const updatedRows = rows.map((row) => {
      const rowMinutes = timeToMinutes(row.time);

      if (rowMinutes >= startMinutes && rowMinutes < endMinutes) {
        return {
          ...row,
          [selectedCourt]: `${reservation.name} ${reservation.details}`,
        };
      }
      return row;
    });
    setRows(updatedRows);
  };

  return (
    <Box style={{ height: '100%', width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        disableColumnResize={true}
        disableColumnMenu={true}
        disableColumnSorting={true}
        disableRowSelectionOnClick={true}
        rowHeight={25}
        onCellClick={handleCellClick}
        sx={{
          '& .MuiDataGrid-cell': {
            border: '1px solid rgba(224, 224, 224, 1)',
          },
          '& .MuiDataGrid-virtualScrollerRenderZone': {
            backgroundImage: 'url("/Reservita/images/tk_borac_logo_bw.png")',
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

      <NewReservationDialog
        open={openDialog}
        defaultStartTime={selectedStartTime}
        onClose={handleDialogClose}
        onConfirm={handleConfirmReservation}
        availableTimes={timeRange}
      />
    </Box>
  );
};

export default ReservationTable;
