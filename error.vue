<template>
  <div class="h-screen w-screen flex items-center justify-center">
    <NuxtLoadingIndicator />
    <div class="flex flex-col gap-2 items-center">
      <div>Page not found</div>
      <NuxtLink class="text-blue-500 hover:text-blue-600 hover:underline" to="/"
        >Back to home</NuxtLink
      >
    </div>
  </div>
</template>
<script lang="ts" setup></script>
