<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
    <div class="flex items-center">
      <div class="flex-shrink-0">
        <div :class="iconClasses">
          <UIcon :name="icon" class="h-6 w-6 text-white" />
        </div>
      </div>

      <div class="mx-5 w-0 flex-1">
        <dl>
          <dt
            class="text-sm font-medium text-gray-500 dark:text-gray-400 truncate"
          >
            {{ title }}
          </dt>
          <dd class="flex items-baseline">
            <div class="text-2xl font-semibold text-gray-900 dark:text-white">
              {{ value }}
            </div>
            <div
              v-if="trend"
              :class="trendClasses"
              class="ml-2 flex items-baseline text-sm font-semibold"
            >
              <UIcon
                :name="trendIcon"
                class="self-center flex-shrink-0 h-4 w-4"
                aria-hidden="true"
              />
              <span class="sr-only">
                {{ trendDirection === "up" ? "Increased" : "Decreased" }} by
              </span>
              {{ trend }}
            </div>
          </dd>
        </dl>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Props
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  value: {
    type: [Number, String],
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  trend: {
    type: String,
    required: false,
  },
});

// Computed properties
const iconClasses = computed(() => {
  const baseClasses = "flex items-center justify-center h-10 w-10 rounded-md";
  const colorClasses = {
    blue: "bg-blue-500",
    green: "bg-green-500",
    purple: "bg-purple-500",
    pink: "bg-pink-500",
    yellow: "bg-yellow-500",
    red: "bg-red-500",
    indigo: "bg-indigo-500",
  };

  return `${baseClasses} ${colorClasses[props.color]}`;
});

const trendDirection = computed(() => {
  if (!props.trend) return null;
  return props.trend.startsWith("+") ? "up" : "down";
});

const trendIcon = computed(() => {
  return trendDirection.value === "up"
    ? "lucide:trending-up"
    : "lucide:trending-down";
});

const trendClasses = computed(() => {
  return trendDirection.value === "up"
    ? "text-green-600 dark:text-green-400"
    : "text-red-600 dark:text-red-400";
});
</script>
