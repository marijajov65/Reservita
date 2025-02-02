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
  const [reservationData, setReservationData] = useState<Reservation>({
    startTime: defaultStartTime,
    endTime: addHours(defaultStartTime, 1),
    name: '',
    details: '',
  });

  useEffect(() => {
    setReservationData({
      name: '',
      startTime: defaultStartTime,
      endTime: addHours(defaultStartTime, 1),
      details: '',
    });
  }, [open, defaultStartTime]);

  // Update endTime when startTime changes
  useEffect(() => {
    setReservationData((prevState) => ({
      ...prevState,
      endTime: addHours(prevState.startTime, 1),
    }));
  }, [reservationData.startTime]);

  const validEndTimes = useMemo(
    () => availableTimes.filter((time) => time > reservationData.startTime),
    [availableTimes, reservationData.startTime],
  );

  const handleChange = (field: keyof Reservation, value: string) => {
    setReservationData((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const isFormValid = reservationData.name.trim() !== '';

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
          value={reservationData.name}
          onChange={(e) => handleChange('name', e.target.value)}
        />

        <Box display="flex" gap={2} alignItems="center">
          <FormControl fullWidth margin="dense" required>
            <InputLabel id="start-time-label">Od</InputLabel>
            <Select
              labelId="start-time-label"
              value={reservationData.startTime}
              label="Pocetak Termina"
              onChange={(e) => handleChange('startTime', e.target.value)}
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
              value={reservationData.endTime}
              label="Kraj Termina"
              onChange={(e) => handleChange('endTime', e.target.value)}
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
