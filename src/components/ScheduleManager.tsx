import React, { useState } from 'react';
import Header from './Header.tsx';
import ReservationTable from './ReservationTable.tsx';

const ScheduleManager = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const handleDateChange = (newDate: Date) => {
    setSelectedDate(newDate);
  };

  return (
    <>
      <Header selectedDate={selectedDate} onDateChange={handleDateChange} />
      <ReservationTable selectedDate={selectedDate} />
    </>
  );
};

export default ScheduleManager;
