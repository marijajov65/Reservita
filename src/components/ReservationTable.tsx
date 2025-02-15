import React, { useState } from 'react';
import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import NewReservationDialog from './NewReservationDialog.tsx';
import { Reservation } from '../models/Reservation.ts';
import useScheduleData from '../hooks/useScheduleData.ts';
import { createReservation } from '../api/api.ts';

interface ReservationTableProps {
  selectedDate: Date;
}

const ReservationTable: React.FC<ReservationTableProps> = ({ selectedDate }) => {
  const { rows, setRows, columns, availableTimes, loading, error } = useScheduleData(selectedDate);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedStartTime, setSelectedStartTime] = useState('');
  const [selectedCourtId, setSelectedCourtId] = useState(0);

  const handleCellClick = (params: any) => {
    const selectedTime = params.row.time;
    setSelectedStartTime(selectedTime);
    const court = params.colDef.id;
    setSelectedCourtId(court);
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

    const startMinutes = timeToMinutes(reservation.start_time);
    const endMinutes = timeToMinutes(reservation.end_time);

    // Find the range of rows to highlight
    const updatedRows = rows.map((row) => {
      const rowMinutes = timeToMinutes(row.time);

      if (rowMinutes >= startMinutes && rowMinutes < endMinutes) {
        return {
          ...row,
          [selectedCourtId]: `${reservation.name}`,
        };
      }
      return row;
    });
    setRows(updatedRows);

    // Persist
    const requestData = JSON.stringify({
      ...reservation,
      reservation_date: reservation.reservation_date.toISOString().split('T')[0], // Format the date as YYYY-MM-DD
    });

    createReservation(requestData)
      .then(() => {
        console.log('Reservation created.');
      })
      .catch((error) => {
        console.error('Error creating reservation:', error);
      });
  };

  return (
    <Box style={{ height: '100%', width: '100%' }}>
      {error && <p>{error}</p>}
      <DataGrid
        rows={rows}
        loading={loading}
        getRowId={(row) => row.time}
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
        court_id={selectedCourtId}
        reservation_date={selectedDate}
        open={openDialog}
        defaultStartTime={selectedStartTime}
        onClose={handleDialogClose}
        onConfirm={handleConfirmReservation}
        availableTimes={availableTimes}
      />
    </Box>
  );
};

export default ReservationTable;
