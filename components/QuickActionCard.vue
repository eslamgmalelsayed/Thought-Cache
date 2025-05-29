<template>
  <NuxtLink
    :to="to"
    class="group relative rounded-lg p-6 bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-all duration-200 border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
  >
    <div>
      <span :class="iconClasses">
        <UIcon :name="icon" class="h-6 w-6 text-white" aria-hidden="true" />
      </span>
    </div>

    <div class="mt-4">
      <h3 class="text-lg font-medium text-gray-900 dark:text-white">
        <span class="absolute inset-0" aria-hidden="true" />
        {{ title }}
      </h3>
      <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">
        {{ description }}
      </p>
    </div>

    <span
      class="pointer-events-none absolute top-6 right-6 text-gray-300 dark:text-gray-600 group-hover:text-gray-400 dark:group-hover:text-gray-500"
      aria-hidden="true"
    >
      <UIcon name="lucide:external-link" class="h-6 w-6" />
    </span>
  </NuxtLink>
</template>

<script setup lang="ts">
// Props
const props = defineProps<{
  title: string;
  description: string;
  icon: string;
  color: "primary" | "blue" | "green" | "purple" | "pink" | "yellow" | "red";
  to: string;
}>();

// Computed properties
const iconClasses = computed(() => {
  const baseClasses = "inline-flex items-center justify-center p-3 rounded-lg";
  const colorClasses = {
    primary: "bg-primary-600",
    blue: "bg-blue-600",
    green: "bg-green-600",
    purple: "bg-purple-600",
    pink: "bg-pink-600",
    yellow: "bg-yellow-600",
    red: "bg-red-600",
  };

  return `${baseClasses} ${colorClasses[props.color]}`;
});
</script>
