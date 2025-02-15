import { useEffect, useState } from "react";
import { fetchCourts, fetchSchedule } from '../api/api.ts';

interface Court {
  id: number;
  name: string;
  indoor: boolean;
  surface: string;
  availableTimes: string[];
}

interface Schedule {
  time: string;
  [court: string]: string;
}

interface ScheduleData {
  rows: any[];
  setRows(rows: any[]): void;
  columns: { id: number, field: string; headerName: string; editable: boolean; flex: number }[];
  availableTimes: string[];
  loading: boolean;
  error: string | null;
}

const useScheduleData = (date: Date): ScheduleData => {
  const [columns, setColumns] = useState<{ id: number, field: string; headerName: string; editable: boolean; flex: number }[]>([]);
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);

  useEffect(() => {
    fetchCourts()
      .then((response) => {
        const data: Court[] = response.data;
        const dynamicColumns = [
          {
            field: "time",
            id: 0,
            headerName: "Vrijeme",
            editable: false,
            maxWidth: 70,
            flex: 0,
          },
          ...data.map((court) => ({
            id: court.id,
            field: `${court.id}`,
            headerName: court.name,
            editable: false,
            flex: 1,
          })),
        ];
        setColumns(dynamicColumns);
      })
      .catch((error) => {
        setError(`Error fetching court info: ${error}`);
      });
  }, []);

  useEffect(() => {
    if (!date) return;
    setLoading(true);

    fetchSchedule(date)
      .then((response) => {
        const schedule: Schedule[] = response.data
        setRows(response.data);
        console.log(response.data);
        const times = schedule.map((entry) => entry.time);
        setAvailableTimes(times);
      })
      .catch((error) => {
        setError(`Error fetching schedule: ${error}`);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [date]);

  return { rows, setRows, columns, loading, error, availableTimes };
};

export default useScheduleData;
