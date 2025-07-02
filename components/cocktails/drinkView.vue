<template>
    <div class="bg-white rounded-lg shadow-md p-6 flex flex-col items-start">
        <div class="flex w-full justify-between">
            <div class="text-left">
                
                <h3 class="text-xl font-semibold text-blue-600 mb-3">{{ drink.strDrink }}</h3>
                <p class="text-gray-700 mb-1"><strong class="font-medium">Category:</strong> {{ drink.strCategory }}</p>
                <p class="text-gray-700 mb-1"><strong class="font-medium">Alcoholic:</strong> {{ drink.strAlcoholic }}</p>
                <p class="text-gray-700 mb-4"><strong class="font-medium">Glass:</strong> {{ drink.strGlass }}</p>
                <h4 class="text-lg font-semibold text-gray-700 mb-2">Instructions:</h4>
                <p class="text-gray-600 text-sm leading-relaxed">{{ drink.strInstructions }}</p>
            </div>
            <img loading="lazy" :src="drink.strDrinkThumb" :alt="drink.strDrink" class="w-36 h-36 object-cover rounded-full mb-4 border-2 border-gray-200" />
        </div>

        <h4 class="text-left text-lg font-semibold text-gray-700 mb-2">Ingredients:</h4>
        <ul class="list-disc list-inside text-left w-full px-4 mb-4">
          <li v-for="(item, index) in getIngredientsAndMeasures(drink)" :key="index" class="text-gray-600 mb-1">
            {{ item }}
          </li>
        </ul>
      </div>
</template>

<script lang="ts" setup>

defineProps<{
    drink: DrinkResponse
}>()

const getIngredientsAndMeasures = (drink: DrinkResponse) => {
  const items: string[] = [];
  for (let i = 1; i <= 15; i++) {
    const ingredientKey = `strIngredient${i}` as keyof DrinkResponse;
    const measureKey = `strMeasure${i}` as keyof DrinkResponse;

    const ingredient = drink[ingredientKey];
    const measure = drink[measureKey];

    if (ingredient) {
      items.push(`${measure ? measure.trim() + ' ' : ''}${ingredient.trim()}`);
    }
  }
  return items.filter(item => item !== '');
};

</script>