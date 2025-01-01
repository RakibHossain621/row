import moment from 'moment';

export function formatDate(date: Date, format = 'MMM/DD/YYYY') {
  return moment(date).format(format);
}

export function formatDateFromnow(date: Date, format = 'MMM-DD-YYYY') {
  if (moment().diff(moment(date), 'years') > 0) { return moment(date).format(format); }
  return moment(date).fromNow();
}

export function dobToAge(date: Date) {
  return (
    moment().diff(moment(date), 'years') > 0
    && `${moment().diff(moment(date), 'years')}+`
  );
}

export function formatLocaleDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit', 
    month: '2-digit', 
    year: 'numeric'
  });
}

export function formatDateNew(date) {
  const d = new Date(date);
  const month = String(d.getMonth() + 1).padStart(2, '0'); 
  const day = String(d.getDate()).padStart(2, '0'); 
  const year = d.getFullYear();

  return `${month}/${day}/${year}`;
}

export function formatDateToMMMDDYYYY(dateInput:string) {
  if (!dateInput) {
    throw new Error("Invalid date input. Please provide a valid Date object or a valid date string.");
  }

  const date = new Date(dateInput);
  if (isNaN(date.getTime())) {
    throw new Error("Invalid date input. Unable to parse the date.");
  }

  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  const day = String(date.getDate()).padStart(2, "0");
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `${month}/${day}/${year}`;
}