<template>
  <button :class="color">
    <slot />
  </button>
</template>
<script setup>
defineProps({
  color: {
    type: String,
    default: "primary",
  },
});
</script>
