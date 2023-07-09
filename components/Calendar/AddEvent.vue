<template>
  <div class="flex justify-between items-center mb-4">
    <h3>Add Event</h3>
    <Icon name="iconoir:cancel" size="25" @click="$emit('cancel')" />
  </div>
  <div class="mb-4">
    <GenericInput
      v-model:value="form.name"
      v-model:show-validation="validationForm.name"
      x-class="w-full"
      label="Event Name"
      :error-message="error.name"
      :required="true"
      :validator="/.+/g"
      @update:show-validation="validationForm.name"
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
      :error-message="$error_message.format"
      @update:show-validation="(e) => validationForm.invitees = e"
    />
  </div>
  <div class="flex justify-between">
    <GenericButton @click="addEvent">Save</GenericButton>
  </div>
</template>
<script setup>
const props = defineProps({
  calendarId: {
    type: [Number, String],
    default: "",
  },
  invitees: {
    type: Array,
    default: [],
  },
});

const emit = defineEmits(["cancel", "openAlert"]);

const events = useEventsStore();

const { $error_message } = useNuxtApp();

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

function addEvent() {
  Object.keys(form.value).map((key) => {
    if (
      (form.value[key] == "" || !form.value[key]) &&
      (key == "name" || key == "time")
    ) {
      error.value[key] = $error_message.required;
      validationForm[key] = true;
    }
  });
  if (Object.values(validationForm).some((val) => val)) {
    return false;
  }
  if (!events.limiter(props.calendarId)) {
    emit("openAlert");
    return;
  }
  events.addEvent({
    id: Date.now().toString(36) + Math.random().toString(36).substring(2),
    calendar_id: props.calendarId,
    color: Math.floor(Math.random() * 16777215).toString(16),
    ...form.value,
  });
  emit("cancel");
}
</script>
