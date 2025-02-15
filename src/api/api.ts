import axios from 'axios';
import { format } from 'date-fns';

const baseUrl = 'https://reservita-web-app-559b1e35dc1c.herokuapp.com';

export const fetchSchedule = (date: Date) => {
  if (!date) {
    return Promise.reject('Date is null');
  }
  const formattedDate = format(date, 'yyyy/M/d');
  return axios.get(`${baseUrl}/schedule/${formattedDate}`);
};

export const fetchCourts = () => {
  return axios.get(`${baseUrl}/courts/all_courts`);
};

export const createReservation = (data: string) => {
  return axios.post(`${baseUrl}/reservation/create_reservation`, data, {
    headers: { 'Content-Type': 'application/json' },
  });
};
