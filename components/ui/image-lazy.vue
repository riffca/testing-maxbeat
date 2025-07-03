<template>
  <img
    ref="imgRef"
    :data-src="src"
    :alt="alt"
    :class="{ 'lazy-loaded': loaded }"
  />
</template>

<script lang="ts" setup>
const props = defineProps<{
  src: string;
  alt: string;
}>();

const imgRef = ref<HTMLImageElement | null>(null);
const loaded = ref(false);
let observer: IntersectionObserver | null = null;

const loadImage = () => {
  if (imgRef.value) {
    imgRef.value.src = props.src;
    imgRef.value.onload = () => {
      loaded.value = true;
    };
    imgRef.value.onerror = () => {
      console.error(`Failed to load image: ${props.src}`);
    };
  }
};

onMounted(() => {
  if ("IntersectionObserver" in window) {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            loadImage();
            if (observer) {
              observer.unobserve(entry.target);
            }
          }
        });
      },
      {
        rootMargin: "0px",
        threshold: 0.01,
      },
    );

    if (imgRef.value) {
      observer.observe(imgRef.value);
    }
  } else {
    loadImage();
  }
});

onUnmounted(() => {
  if (observer && imgRef.value) {
    observer.unobserve(imgRef.value);
  }
});
</script>

<style scoped>
img {
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
  &.lazy-loaded {
    opacity: 1;
  }
}
</style>
