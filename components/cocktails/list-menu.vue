<template>
  <div class="w-full">
    <ui-flex-col class="gap-adapt-[12] py-adapt-[16,20] px-adapt-[0,20] sticky top-0">
      <NuxtLink
        v-for="(item, index) in items"
        :key="index"
        :to="item.title"
        :class="{
          'bg-gray-50': !item.selected,
          'bg-gray-200 font-bold': item.selected,
        }"
        class="group flex max-tablet:justify-center p-adapt-[16,24] rounded-lg hover:bg-gray-200 transition-colors"
      >
        <div
          class="text-blue-600 text-adapt-[18,16] first-letter:uppercase group-hover:text-blue-800 truncate"
        >
          {{ item.title }}
        </div>
      </NuxtLink>
    </ui-flex-col>

    <p v-if="!items.length" class="text-gray-500 text-center py-4">No items</p>
  </div>
</template>

<script setup lang="ts">
type ListItem = {
  selected: boolean;
  url: string;
  title: CocktailTypes;
};

defineProps<{
  items: ListItem[];
}>();
</script>
