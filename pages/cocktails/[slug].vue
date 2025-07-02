<template>
  <div>
    <div v-if="!pending">
      <template v-if="currentDrinks?.length">
        <div v-for="(drink, index) in currentDrinks" :key="index" class="flex flex-col">
          <cocktails-drink-view :drink />
        </div>
      </template>
      <div v-else>No Items</div>
    </div>
    <div v-else>Loading</div>
  </div>
</template>
<script lang="ts" setup>
defineProps<{
  currentDrinks: [];
  pending: boolean;
}>();
</script>
