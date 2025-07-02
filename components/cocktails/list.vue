<template>
  <div class="max-w-md mx-auto p-4">
    <ul class="space-y-3">
      <NuxtLink 
        :to="`${rootPage ? 'cocktails/' : ''}${item.title}`"
        :class="{
          'bg-gray-50': !item.selected,
          'bg-gray-200 font-bold': item.selected,
        }"
        v-for="(item, index) in items" 
        :key="index"
        class="group flex items-center justify-between p-3 rounded-lg hover:bg-gray-200 transition-colors"
      >
        <div 
          @click="emit('click-item',item)"
          class="text-blue-600 first-letter:uppercase group-hover:text-blue-800 truncate"
          rel="noopener noreferrer"
        >
          {{ item.title }}
        </div>
      </NuxtLink>
    </ul>
    
    <p 
      v-if="!items.length" 
      class="text-gray-500 text-center py-4"
    >
      No items
    </p>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  'click-item': [value: ListItem]
}>()

type ListItem = {
  selected: boolean,
  url: string;
  title: CocktailTypes;
}

defineProps<{
  items: ListItem[];
  rootPage: boolean;
}>();
</script>