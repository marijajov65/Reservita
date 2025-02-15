import React, { useState, useEffect, useMemo } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  Box,
} from '@mui/material';
import { addHours } from '../helpers/timeHelper.ts';
import { Reservation } from '../models/Reservation.ts';

interface NewReservationProps {
  court_id: number;
  reservation_date: Date;
  open: boolean;
  defaultStartTime: string;
  onClose: () => void;
  onConfirm: (reservation: Reservation) => void;
  availableTimes: string[];
}

const NewReservationDialog: React.FC<NewReservationProps> = ({
  court_id,
  reservation_date,
  open,
  defaultStartTime,
  onClose,
  onConfirm,
  availableTimes,
}) => {
  const [reservationData, setReservationData] = useState<Reservation>({
    court_id: court_id,
    reservation_date: reservation_date,
    start_time: defaultStartTime,
    end_time: addHours(defaultStartTime, 1),
    name: '',
    details: '',
  });

  useEffect(() => {
    setReservationData({
      court_id: court_id,
      reservation_date: reservation_date,
      start_time: defaultStartTime,
      end_time: addHours(defaultStartTime, 1),
      details: '',
      name: '',
    });
  }, [open, defaultStartTime]);

  // Update endTime when startTime changes
  useEffect(() => {
    setReservationData((prevState) => ({
      ...prevState,
      end_time: addHours(prevState.start_time, 1),
    }));
  }, [reservationData.start_time]);

  const validEndTimes = useMemo(
    () => availableTimes.filter((time) => time > reservationData.start_time),
    [availableTimes, reservationData.start_time],
  );

  const handleChange = (field: keyof Reservation, value: string) => {
    setReservationData((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const isFormValid = reservationData.name.trim() !== '';

  return (
    <Dialog open={open} onClose={onClose} autoFocus={false}>
      <DialogTitle>Nova Rezervacija</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          margin="dense"
          label="Ime i prezime"
          type="text"
          required
          value={reservationData.name}
          onChange={(e) => handleChange('name', e.target.value)}
        />

        <Box display="flex" gap={2} alignItems="center">
          <FormControl fullWidth margin="dense" required>
            <InputLabel id="start-time-label">Od</InputLabel>
            <Select
              labelId="start-time-label"
              value={reservationData.start_time}
              label="Pocetak Termina"
              onChange={(e) => handleChange('start_time', e.target.value)}
            >
              {availableTimes.map((time) => (
                <MenuItem key={time} value={time}>
                  {time}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth margin="dense" required>
            <InputLabel id="end-time-label">Do</InputLabel>
            <Select
              labelId="end-time-label"
              value={reservationData.end_time}
              label="Kraj Termina"
              onChange={(e) => handleChange('end_time', e.target.value)}
            >
              {validEndTimes.map((time) => (
                <MenuItem key={time} value={time}>
                  {time}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <TextField
          fullWidth
          margin="dense"
          label="Detalji"
          type="text"
          multiline
          rows={4}
          value={reservationData.details}
          onChange={(e) => handleChange('details', e.target.value)}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} variant="outlined">
          Otkaži
        </Button>
        <Button
          onClick={() => onConfirm(reservationData)}
          variant="contained"
          disabled={!isFormValid}
        >
          Potvrdi
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NewReservationDialog;
