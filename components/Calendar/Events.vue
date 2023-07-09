<template>
  <CalendarAddEvent
    v-if="onAdd"
    :calendar-id="id"
    @open-alert="$emit('openAlert')"
    @cancel="onAdd = false"
  />
  <div v-show="!onAdd">
    <div class="flex justify-between items-center mb-4">
      <GenericButton @click="onAdd = true">Add Event</GenericButton>
      <span>
        <p>All events on</p>
        <h1>
          {{
            new Date(id).toLocaleString("default", {
              day: "numeric",
              weekday: "long",
              month: "long",
              year: "numeric",
            })
          }}
        </h1>
      </span>
    </div>
    <ul class="flex flex-col">
      <template v-for="(event, index) in events" :key="index">
        <CalendarEvent :event="event" />
      </template>
    </ul>
  </div>
  <div v-if="events.length == 0" class="flex justify-center items-center h-full">
    <p class="text-center">
      No Events Yet!
    </p>
  </div>
</template>
<script setup>
const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
  events: {
    type: Array,
    default: [],
  },
});

defineEmits(["openAlert"]);

const onAdd = ref(false);
</script>
