<template>
  <ui-flex-col>
    <h4 class="text-adapt-[12,18] font-semibold text-gray-700 mb-2">
      Instructions:
    </h4>
    <p class="text-gray-600 text-sm leading-relaxed">
      {{ instructions }}
    </p>
  </ui-flex-col>
</template>
<script lang="ts" setup>
defineProps<{
  instructions: string;
}>();
</script>
