import { getLocale } from './localization';

const DateHelper = {
  _days: [
    { en: 'Sunday', id: 'Minggu', es: 'Domingo' },
    { en: 'Monday', id: 'Senin', es: 'Lunes' },
    { en: 'Tuesday', id: 'Selasa', es: ' Martes' },
    { en: 'Wednesday', id: 'Rabu', es: ' Miércoles' },
    { en: 'Thursday', id: 'Kamis', es: 'jueves' },
    { en: 'Friday', id: 'Jumat', es: ' Viernes' },
    { en: 'Saturday', id: 'Sabtu', es: 'Sábado' },
  ],

  _months: [
    { en: 'January', id: 'Januari', es: 'Domingo' },
    { en: 'February', id: 'Februari', es: 'Febrero' },
    { en: 'March', id: 'Maret', es: 'Marzo' },
    { en: 'April', id: 'April', es: 'Abril' },
    { en: 'May', id: 'Mei', es: 'Puede' },
    { en: 'June', id: 'Juni', es: 'Junio' },
    { en: 'July', id: 'Juli', es: 'Julio' },
    { en: 'August', id: 'Agustus', es: 'Agosto' },
    { en: 'September', id: 'September', es: 'Septiembre' },
    { en: 'October', id: 'Oktober', es: 'Octubre' },
    { en: 'November', id: 'November', es: 'Noviembre' },
    { en: 'December', id: 'Desember', es: 'Diciembre' },
  ],

  parseDate(rawdate) {
    const date = new Date(rawdate);
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDay();
    const hour = date.getHours();
    const minute = date.getMinutes();

    const currentLocale = getLocale();

    return {
      hour,
      minute,
      day,
      dayName: this._days[day][currentLocale],
      date: date.getDate(),
      month,
      monthName: this._months[month][currentLocale],
      year,
    };
  },

  formatDate(rawDate) {
    const dates = this.parseDate(rawDate);
    return `${dates.dayName}, ${dates.date} ${dates.monthName} ${dates.year}`;
  },
};

export default DateHelper;
