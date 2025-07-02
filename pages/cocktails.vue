<template>
  <div class="grid grid-rows-1 grid-cols-[1fr_2fr]">
    <cocktails-list :root-page="isRootPage" :items="cocktails" />
    <div>
      <NuxtPage :current-drinks :pending />
    </div>
  </div>
</template>
<script lang="ts" setup>
const route = useRoute();

const currentType = computed(() => route.params.slug);

const cocktails = computed(() =>
  Object.values(CocktailTypes).map((item) => ({
    url: item,
    title: item,
    selected: item === currentType.value,
  })),
);

const { getCocktails, cockTailsMap } = useCocktails();

const currentCocktailData = computed(() => {
  return currentType.value ? cockTailsMap.value[currentType.value as CocktailTypes] : null;
});

const currentDrinks = computed(() => currentCocktailData.value?.drinks);

const isRootPage = computed(
  () => route.name === "cocktails" && route.path[route.path.length - 1] !== "/",
);

const { pending } = await useAsyncData(
  () => `cocktails-${currentType.value}`,
  async () => {
    if (isRootPage.value) return;
    return await getCocktails(currentType.value as CocktailTypes);
  },
  {
    watch: [currentType],
    immediate: true,
    default: () => cockTailsMap.value[currentType.value as CocktailTypes] || null,
  },
);
</script>
