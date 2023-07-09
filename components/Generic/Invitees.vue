<template>
  <div>
    <span class="mb-2">
      <p>Invite people</p>
    </span>
    <ul class="w-full">
      <li
        v-for="(option, i) in optionInArray"
        :key="i"
        class="flex items-center justify-between mb-2"
        :class="{ hidden: !!option.isDeleted }"
      >
        <GenericInput
          :id="`optionIndex[${i}]`"
          v-model:value="option.email"
          v-model:show-validation="validation[i]"
          type="text"
          :x-class="`w-full ${!option.email?.trim() ? 'warning' : ''}`"
          :error-message="$error_message.format"
          :required="false"
          :validator="/^[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i"
          @update:value="updateValueFromInputChange"
        />
        <button
          class="ml-5"
          :disabled="isDisabledDeleteChoice"
          :class="{ 'opacity-50 cursor-not-allowed': isDisabledDeleteChoice }"
          @click="removeData(i)"
        >
          <Icon
            :style="{
              cursor: isDisabledDeleteChoice ? 'not-allowed' : 'pointer',
            }"
            name="mdi:trash-can"
            color="#EB5757"
            size="20"
          />
        </button>
      </li>
    </ul>
    <div>
      <button class="mb-2" @click="addMoreValue()">+ Add More People</button>
    </div>
  </div>
</template>
<script setup>
const emit = defineEmits(["update:value", "update:show-validation"]);
const props = defineProps({
  value: {
    type: Array,
    default: () => [],
  },
  showValidation: {
    type: Boolean,
    default: false,
  },
  errorMessage: {
    type: String,
    default: "Error",
  },
});

const { $error_message } = useNuxtApp();

const validation = ref([]);

const optionInArray = ref(JSON.parse(JSON.stringify(props.value)));
const dataBeforeEdit = ref([]);

if (props.isEdit) {
  dataBeforeEdit.value = JSON.parse(JSON.stringify(props.value));
}

const isDisabledDeleteChoice = computed(() => {
  return (
    optionInArray.value?.filter(
      (op) =>
        (op.isDeleted === undefined || !op.isDeleted) &&
        op.email?.trim()?.length > 0
    )?.length === 1
  );
});

function updateValueFromInputChange() {
  if (validation.value.some((val) => val)) {
    return emit("update:show-validation", true);
  }
  emit("update:show-validation", false);
  emit("update:value", [...optionInArray.value]);
}

function removeData(i) {
  optionInArray.value.splice(i, i);
  emit("update:value", [...optionInArray.value]);
}

function addMoreValue() {
  optionInArray.value?.push({ email: "" });
  emit("update:value", [...optionInArray.value]);
  setTimeout(() => {
    document
      .getElementById(`optionIndex[${optionInArray.value.length - 1}]`)
      ?.focus();
  }, 0);
}

function initAddForm() {
  if (
    optionInArray.value?.filter(
      (op) => op.isDeleted === undefined || !op.isDeleted
    )?.length === 0
  ) {
    addMoreValue();
  }
}

onMounted(() => {
  initAddForm();
});
</script>
<style scoped lang="scss">
button {
  padding: 0;
}
</style>
