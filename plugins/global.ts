export default defineNuxtPlugin(() => {
  const App = {
    days: [
      "Monday",
      "Tuesday",
      "Wednesdey",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday"
    ],
    monthlyCalendar(year: number, month: number, startDay: number) {
      const firstDay = new Date(year, month).getDay();

      const firstOffset = firstDay < startDay ? firstDay : firstDay - startDay;
      const monthDays = 32 - new Date(year, month, 32).getDate();

      let cells = firstOffset + monthDays
      while (cells % 7 !== 0) cells++

      const calendar = []

      for (let i = 0; i < cells; i++) {
        const date = new Date(year, month, i - firstOffset + 1)
        const currentDate = new Date()

        if (i < firstOffset) {
          calendar.push({ id: date.valueOf(), date, disabled: true })
        } else if (i >= monthDays + firstOffset) {
          calendar.push({ id: date.valueOf(), date, disabled: true })
        } else if (
          currentDate.getDate() === i - firstOffset + 1 &&
          currentDate.getMonth() === month &&
          currentDate.getFullYear() === year
        ) {
          calendar.push({ id: date.valueOf(), date, active: true })
        } else {
          calendar.push({ id: date.valueOf(), date })
        }
      }

      return calendar
    },
    error_message: {
      required: 'Field required',
      format: 'Format not matched',
      format_url: `you have entered an invalid website address(make sure to include 'http//' or 'https//')`
    },
  };
  return {
    provide: App,
  };
})