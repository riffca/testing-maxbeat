<template>
  <div class="rounded-lg border p-6 flex flex-col gap-adapt-[8,16] items-start">
    <div class="flex w-full justify-between">
      <ui-flex-col class="text-left gap-adapt-[4,8,12]">
        <h3 class="text-adapt-[16,20] font-semibold text-blue-600 mb-3">
          {{ drink.strDrink }}
        </h3>
        <ui-flex-col class="max-tablet:h-full max-tablet:justify-center">
          <p class="text-gray-700">
            <strong class="font-medium text-rem-[16] max-tablet:hidden">Category:</strong>
            {{ drink.strCategory }}
          </p>
          <p class="text-gray-700">
            <strong class="font-medium text-rem-[16] max-tablet:hidden">Alcoholic:</strong>
            {{ drink.strAlcoholic }}
          </p>
          <p class="text-gray-700 mb-4">
            <strong class="font-medium text-rem-[16] max-tablet:hidden">Glass:</strong>
            {{ drink.strGlass }}
          </p>
        </ui-flex-col>
      </ui-flex-col>
      <ui-image-lazy
        :src="drink.strDrinkThumb"
        :alt="drink.strDrink"
        class="w-adapt-[160,144] h-adapt-[160,144] inline-block object-cover rounded-full mb-4 border-2 border-gray-200"
      />
    </div>

    <cocktails-drink-view-instructions :instructions="drink.strInstructions" />

    <ui-flex-col class="gap-adapt-[8,16]">
      <h4 class="text-left text-adapt-[16,18] font-semibold text-gray-700 mb-2">Ingredients:</h4>

      <ul class="flex flex-col list-disc list-inside text-left w-full px-adapt-[16]">
        <li
          v-for="(item, index) in getIngredientsAndMeasures(drink)"
          :key="index"
          class="text-gray-600 mb-1 t-adapt-[16]"
        >
          {{ item }}
        </li>
      </ul>
    </ui-flex-col>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  drink: DrinkResponse;
}>();

const getIngredientsAndMeasures = (drink: DrinkResponse) => {
  const items: string[] = [];
  for (let i = 1; i <= 15; i++) {
    const ingredientKey = `strIngredient${i}` as keyof DrinkResponse;
    const measureKey = `strMeasure${i}` as keyof DrinkResponse;

    const ingredient = drink[ingredientKey];
    const measure = drink[measureKey];

    if (ingredient) {
      items.push(`${measure ? measure.trim() + " " : ""}${ingredient.trim()}`);
    }
  }
  return items.filter((item) => item !== "");
};
</script>
