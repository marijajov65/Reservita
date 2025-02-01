import React, { useState } from 'react';
import { Box } from '@mui/material';
import { DataGrid, GridRowsProp } from '@mui/x-data-grid';
import NewReservationDialog from './NewReservationDialog.tsx';
import { columns } from '../data/data.ts';
import { generateTimeRange } from '../utils/timeHelper.ts';

const ReservationTable: React.FC = () => {
  const [rows, setRows] = useState<GridRowsProp>(
    generateTimeRange(7, 23, 30).map((time, index) => ({
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

  const handleConfirmBooking = (
    name: string,
    startTime: string,
    endTime: string,
  ) => {
    setOpenDialog(false);

    const timeToMinutes = (time: string): number => {
      const [hour, minute] = time.split(':').map(Number);
      const period = time.includes('PM') && hour !== 12 ? 12 : 0; // Handle PM times
      return (hour + period) * 60 + minute;
    };

    const startMinutes = timeToMinutes(startTime);
    const endMinutes = timeToMinutes(endTime);

    // Find the range of rows to highlight
    const updatedRows = rows.map((row) => {
      const rowMinutes = timeToMinutes(row.time);

      if (rowMinutes >= startMinutes && rowMinutes < endMinutes) {
        return {
          ...row,
          [selectedCourt]: name, // Overwrite the cell with the name
          [`${selectedCourt}_highlighted`]: true, // Mark the cell as highlighted
        };
      }

      return row;
    });
    setRows(updatedRows);
  };

  const timeRange = generateTimeRange(7, 23, 30);

  return (
    <Box style={{ height: '100%', width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        disableColumnResize={true}
        disableColumnMenu={true}
        disableColumnSorting={true}
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
        onConfirm={handleConfirmBooking}
        startTimes={timeRange}
        availableTimes={timeRange}
      />
    </Box>
  );
};

export default ReservationTable;
