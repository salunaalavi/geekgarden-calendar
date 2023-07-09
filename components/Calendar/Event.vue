<template>
  <li v-if="!onEdit" class="mb-4">
    <div class="p-4 rounded-[20px]" :style="[`background-color: #${event.color}`]">
      <div class="mb-4">
        <h1>
          {{ event.name }}
        </h1>
        <p class="mb-2">
          at:
          {{ event.time }}
        </p>
        <p>
          Attendants : 
          {{ event.invitees?.map((item) => item.email).join(", ") }}
        </p>
      </div>
      <div class="flex justify-between">
        <GenericButton color="secondary" @click="edit">Edit</GenericButton>
        <GenericButton color="white" @click="deleteEvent">Delete</GenericButton>
      </div>
    </div>
  </li>
  <div v-if="onEdit">
    <div class="flex justify-between items-center mb-4">
      <h3>Edit {{ event.name }}</h3>
      <Icon name="iconoir:cancel" size="25" @click="onEdit = false" />
    </div>
    <div class="mb-4">
      <GenericInput
        v-model:value="form.name"
        x-class="w-full"
        label="Event Name"
        :required="true"
        :validator="/.+/g"
      />
      <GenericInput
        v-model:value="form.time"
        v-model:show-validation="validationForm.time"
        type="time"
        x-class="w-full"
        label="Event Time"
        :error-message="error.time"
        :required="true"
        :validator="/.+/g"
        @update:show-validation="validationForm.time"
      />
      <GenericInvitees
        v-model:value="form.invitees"
        :show-validation="validationForm.invitees"
        error-message="required field filled"
      />
      <GenericButton @click="save">Save</GenericButton>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  event: {
    type: Object,
    default: {},
  },
});

const events = useEventsStore();

const form = ref({
  name: "",
  time: "",
  invitees: [],
});

const error = ref({
  name: "",
  time: "",
  invitees: "",
});

const validationForm = reactive({
  name: false,
  time: false,
  invitees: false,
});

const onEdit = ref(false);

function edit() {
  onEdit.value = true;
  form.value = {
    ...props.event,
  };
}

function save() {
  const index = events.data.findIndex((item) => item.id === props.event.id);
  events.data[index] = {
    ...events.data[index],
    ...form.value,
  };
  onEdit.value = false;
}

function deleteEvent() {
  events.deleteEvent(props.event.id);
}
</script>
