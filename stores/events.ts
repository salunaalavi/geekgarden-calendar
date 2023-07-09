export const useEventsStore = defineStore("events", () => {
  const data = ref();

  function addEvent(value: any = {}) {
    data.value.push(value);
  }

  function deleteEvent(value: any) {
    const index = data.value.findIndex((event: any) => event.id === value);

    if (index > -1) {
      data.value.splice(index, 1);
    }
  }

  function limiter(id: number) {
    return data.value.filter((event: any) => id === event.calendar_id).length < 3
  };

  return {
    data,
    limiter,
    deleteEvent,
    addEvent,
  }
},
{
  persist: {
    storage: persistedState.localStorage
  }
})