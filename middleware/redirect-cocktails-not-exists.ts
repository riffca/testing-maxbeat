export default defineNuxtRouteMiddleware((to) => {
  if (Object.keys(CocktailTypes).includes(to.params.slug as string)) {
    return true;
  }

  if (!to.params.slug) {
    return navigateTo("/cocktails/margarita");
  }

  throw createError({ statusCode: 404 });
});
