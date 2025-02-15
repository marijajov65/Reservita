import React from 'react';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

interface HeaderProps {
  selectedDate: Date;
  onDateChange: (newDate: Date) => void;
}

const Header: React.FC<HeaderProps> = ({ selectedDate, onDateChange }) => {
  return (
    <header>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DesktopDatePicker
          label="Izaberite datum"
          format="dd.MM.yyyy"
          value={selectedDate}
          onChange={(newDate) => {
            if (newDate !== null) {
              onDateChange(newDate);
            }
          }}
        />
      </LocalizationProvider>
    </header>
  );
};

export default Header;
