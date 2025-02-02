export const generateTimeRange = (
  startHour: number,
  endHour: number,
  increment: number,
) => {
  const timeArray: string[] = [];
  const startDate = new Date();
  startDate.setHours(startHour, 0, 0, 0);

  while (startDate.getHours() < endHour) {
    const hours = startDate.getHours().toString().padStart(2, '0');
    const minutes = startDate.getMinutes() === 0 ? '00' : '30';
    timeArray.push(`${hours}:${minutes}`);
    startDate.setMinutes(startDate.getMinutes() + increment);
  }
  return timeArray;
};

export const addHours = (time: string, hoursToAdd: number) => {
  const [hour, minute] = time.split(':').map(Number);
  const totalMinutes = hour * 60 + minute + hoursToAdd * 60;
  const newHour = Math.floor(totalMinutes / 60) % 24; // Ensure it stays within 24 hours
  const newMinute = totalMinutes % 60;

  return `${String(newHour).padStart(2, '0')}:${String(newMinute).padStart(2, '0')}`;
};
