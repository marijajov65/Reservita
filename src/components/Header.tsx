import React, { useState } from 'react';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

const Header = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDateChange = (newDate: Date | null) => {
    setSelectedDate(newDate);
  };

  return (
    <header>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DesktopDatePicker
          label="Izaberite datum"
          format="dd.MM.yyyy"
          value={selectedDate}
          onChange={handleDateChange}
        />
      </LocalizationProvider>
    </header>
  );
};

export default Header;
