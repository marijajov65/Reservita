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
} from '@mui/material';

interface NewReservationProps {
  open: boolean;
  defaultStartTime: string;
  onClose: () => void;
  onConfirm: (name: string, startTime:string, endTime: string) => void;
  startTimes: string[];
  availableEndTimes: string[];
}

const NewReservationDialog: React.FC<NewReservationProps> = ({
  open,
  defaultStartTime,
  onClose,
  onConfirm,
  startTimes,
  availableEndTimes,
}) => {
  const [name, setName] = useState('');
  const [selectedStartTime, setSelectedStartTime] = useState(defaultStartTime);
  const [selectedEndTime, setSelectedEndTime] = useState('');

  const handleConfirm = () => {
    if (selectedEndTime) {
      onConfirm(name, selectedStartTime, selectedEndTime);
    }
  };

  useEffect(() => {
    setName('');
    setSelectedEndTime('');
  }, [open]);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Nova Rezervacija</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="Ime i prezime"
          type="text"
          fullWidth
          onChange={(e) => setName(e.target.value)}
        />

        <FormControl fullWidth margin="dense">
          <InputLabel id="time-select-label">Od</InputLabel>
          <Select
            labelId="time-select-label"
            value={selectedStartTime}
            label="Pocetak Termina"
            onChange={(e) => setSelectedStartTime(e.target.value)}
          >
            {startTimes.map((time, index) => (
              <MenuItem key={`start_time-${index}`} value={time}>
                {time}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth margin="dense">
          <InputLabel id="time-select-label">Do</InputLabel>
          <Select
            labelId="time-select-label"
            value={selectedEndTime}
            label="Kraj Termina"
            onChange={(e) => setSelectedEndTime(e.target.value)}
          >
            {availableEndTimes.map((time, index) => (
              <MenuItem key={`end_time-${index}`} value={time}>
                {time}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Otkaži
        </Button>
        <Button onClick={handleConfirm} color="primary">
          Potvrdi
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NewReservationDialog;
