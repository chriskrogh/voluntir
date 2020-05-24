export enum Period {
  AM = 'AM',
  PM = 'PM'
}

export const getLocalTime = (date: Date) => {
  const hoursIn24HourFormat = date.getHours();

  let period = Period.AM;
  let hours = hoursIn24HourFormat;

  if(hoursIn24HourFormat >= 12) {
    period = Period.PM;
  }
  if(hoursIn24HourFormat === 0) {
    hours = 12;
  }
  if(hoursIn24HourFormat > 12) {
    hours = hoursIn24HourFormat - 12;
  }

  return `${hours}:${date.getMinutes()} ${period}`
}