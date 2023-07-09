<template>
  <button class="calendar__table--cell p-0" :class="[`${isActive ? `active` : ``}`]" @click="setHandler(item)">
    <h3
      class="calendar__table--cell-date"
      :class="[
        item.disabled && 'disabled',
        item.active && 'active',
      ]"
    >
      {{ item.date.getDate() }}
    </h3>
    <template v-for="(event, index) in allEvents" :key="index">
      <div 
        class="calendar__table--cell-event"
        :style="[
          `background-color: #${event.color}`,
        ]"
      >
        <p>
          {{ event.name }}
        </p>
      </div>
    </template>
  </button>
  <GenericModal
    v-model:is-open="modalData.isOpen"
    :content-position="modalData.contentPosition"
    :is-full-height="modalData.isFullheight"
    :max-width="modalData.maxWitdh"
    @update:is-open="isActive = false"
  >
    <CalendarEvents :id="item.id" :events="allEvents" @open-alert="setClose"/>
  </GenericModal>
  <GenericModal
    v-model:is-open="modalAlert.isOpen"
    :content-position="modalAlert.contentPosition"
    :is-full-height="modalAlert.isFullheight"
    :max-width="modalAlert.maxWitdh"
  >
    <h1 class="text-center">
      You cannot add more than 3 events on a single day
    </h1>
  </GenericModal>
</template>
<script setup>
const props = defineProps({
  item: {
    type: Object,
    default: {},
  },
  index: {
    type: Number,
    default: 0,
  },
});

const events = useEventsStore();

const modalData = reactive({
  isOpen: false,
  contentPosition: "right",
  isFullheight: true,
  maxWitdh: 600,
});

const modalAlert = reactive({
  isOpen: false,
  contentPosition: "center",
  isFullheight: false,
  maxWitdh: 400,
});

const isActive = ref(false);

const allEvents = computed(() => events.data?.filter((event) => event.calendar_id === props.item.id));

function setHandler(item) {
  if (item.disabled) return;
  modalData.isOpen = true;
  isActive.value = true;
}

function setClose() {
  modalAlert.isOpen = true;
  isActive.value = false;
}
</script>
