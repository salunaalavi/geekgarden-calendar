<template>
  <main class="calendar">
    <header class="calendar__title relative">
      <h1>
        {{
          calendar.currentDate?.full_date?.toLocaleString("default", {
            month: "long",
            year: "numeric",
          })
        }}
      </h1>
      <div class="absolute right-0 top-0">
        <Icon name="tabler:download" size="25" @click="exportEvents" />
      </div>
    </header>
    <section class="calendar__table">
      <template v-for="(row, index) in $days" :key="index">
        <div class="calendar__table--cell">
          <h2 class="calendar__table--cell-day">
            {{ $days[index] }}
          </h2>
        </div>
      </template>
      <template v-for="(row, index) in calendar.data" :key="index">
        <Calendar :item="row" :index="index" @set-handler="setHandler"/>
      </template>
    </section>
  </main>
</template>
<script setup>
const { $monthlyCalendar, $days } = useNuxtApp();
const calendar = useCalendarStore();

const events = useEventsStore();

function setHandler(item) {
  calendar.setCurrentDate({
    year: item.date.getFullYear(),
    month: item.date.getMonth(),
    day: item.date.getDate(),
    full_date: item.date,
  });
  calendar.setData(
    $monthlyCalendar(calendar.currentDate.year, calendar.currentDate.month, 1)
  );
}

function exportEvents() {
  const filename = "events.json";
  const jsonStr = JSON.stringify(events.data);

  let element = document.createElement("a");
  element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(jsonStr));
  element.setAttribute("download", filename);

  element.style.display = "none";
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

onMounted(() => {
  const date = new Date();
  calendar.setCurrentDate({
    year: date.getFullYear(),
    month: date.getMonth(),
    day: date.getDate(),
    full_date: date,
  });
  calendar.setData(
    $monthlyCalendar(calendar.currentDate.year, calendar.currentDate.month, 1)
  );
});
</script>
