export enum Period {
  AM = 'AM',
  PM = 'PM'
}

export const getLocalTime = ( date: Date ) => {
  const hoursIn24HourFormat = date.getHours();

  let period = Period.AM;
  let hours = hoursIn24HourFormat;
  const minutes = date.getMinutes()

  // period
  if( hoursIn24HourFormat >= 12 ) {
    period = Period.PM;
  }
  // hours
  if( hoursIn24HourFormat === 0 ) {
    hours = 12;
  } else if( hoursIn24HourFormat > 12 ) {
    hours = hoursIn24HourFormat - 12;
  }

  return `${hours}:${minutes < 10 ? '0' : ''}${minutes} ${period}`
}