import React, { useState, useEffect } from 'react';
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
  open: boolean;
  defaultStartTime: string;
  onClose: () => void;
  onConfirm: (reservation: Reservation) => void;
  availableTimes: string[];
}

const NewReservationDialog: React.FC<NewReservationProps> = ({
  open,
  defaultStartTime,
  onClose,
  onConfirm,
  availableTimes,
}) => {
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState(false);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [details, setDetails] = useState('');

  useEffect(() => {
    setName('');
    setNameError(false);
    setStartTime(defaultStartTime);
    setEndTime(addHours(defaultStartTime, 1));
  }, [open]);

  useEffect(() => {
    setEndTime(addHours(startTime, 1));
  }, [startTime]);

  const validEndTimes = availableTimes.filter((time) => time > startTime);

  const handleConfirm = () => {
    const isNameEmpty = name.trim() === '';
    if (isNameEmpty) {
      setNameError(true);
      return;
    }
    const reservation: Reservation = {
      name: name,
      startTime: startTime,
      endTime: endTime,
      details: details,
    };
    onConfirm(reservation);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Nova Rezervacija</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          margin="dense"
          label="Ime i prezime"
          type="text"
          required
          onChange={(e) => setName(e.target.value)}
          error={nameError}
          helperText={nameError ? 'Ime i prezime je obavezno' : ''}
        />

        <Box display="flex" gap={2} alignItems="center">
          <FormControl fullWidth margin="dense" required>
            <InputLabel id="time-select-label">Od</InputLabel>
            <Select
              labelId="time-select-label"
              error={startTime.trim() === ''}
              value={startTime}
              label="Pocetak Termina"
              onChange={(e) => setStartTime(e.target.value)}
            >
              {availableTimes.map((time, index) => (
                <MenuItem key={`start_time-${index}`} value={time}>
                  {time}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth margin="dense" required>
            <InputLabel id="time-select-label">Do</InputLabel>
            <Select
              labelId="time-select-label"
              value={endTime}
              label="Kraj Termina"
              onChange={(e) => setEndTime(e.target.value)}
            >
              {validEndTimes.map((time, index) => (
                <MenuItem key={`end_time-${index}`} value={time}>
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
          onChange={(e) => setDetails(e.target.value)}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} variant="outlined">
          Otkaži
        </Button>
        <Button onClick={handleConfirm} variant="contained">
          Potvrdi
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NewReservationDialog;
