export interface Reservation {
  court_id: number,
  reservation_date: Date;
  start_time: string;
  end_time: string;
  name: string;
  details: string;
}
