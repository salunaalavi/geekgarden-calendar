export const useCalendarStore = defineStore("calendar", () => {
  const currentDate = ref();
  const data = ref();

  function setCurrentDate(value: any) {
    currentDate.value = value
  }

  function setData(value: any) {
    data.value = value;
  }

  return {
    currentDate,
    data,
    setCurrentDate,
    setData,
  };
});
