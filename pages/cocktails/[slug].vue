<template>
  <div class="pt-adapt-[16,20]">
    <div v-if="pending" class="h-full flex items-center text-adapt-[16] justify-center">
      Loading...
    </div>
    <div v-else>
      <ui-flex-col v-if="currentDrinks?.length" class="gap-adapt-[12,16]">
        <div v-for="(drink, index) in currentDrinks" :key="index" class="flex flex-col">
          <cocktails-drink-view :drink />
        </div>
      </ui-flex-col>
      <div v-else class="pt-adapt-[20,40] text-red-500 flex items-center justify-center">
        No data!
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
defineProps<{
  currentDrinks: [];
  pending: boolean;
}>();
</script>
