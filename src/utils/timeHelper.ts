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
