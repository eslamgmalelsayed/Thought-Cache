<template>
  <form class="space-y-6" @submit.prevent="handleSubmit">
    <!-- Name -->
    <div>
      <label
        for="category-name"
        class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
      >
        {{ $t("categories.form.name") || "Category Name" }}
        <span class="text-red-500">*</span>
      </label>
      <UInput
        id="category-name"
        v-model="formData.name"
        :placeholder="$t('categories.form.name') || 'Enter category name...'"
        :error="!!errors.name"
        autocomplete="organization-title"
        required
      />
      <p v-if="errors.name" class="mt-1 text-sm text-red-600 dark:text-red-400">
        {{ errors.name }}
      </p>
    </div>

    <!-- Description -->
    <div>
      <label
        for="category-description"
        class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
      >
        Description
      </label>
      <UTextarea
        id="category-description"
        v-model="formData.description"
        placeholder="Enter category description..."
        :rows="3"
        :error="!!errors.description"
        autocomplete="off"
      />
      <p
        v-if="errors.description"
        class="mt-1 text-sm text-red-600 dark:text-red-400"
      >
        {{ errors.description }}
      </p>
    </div>

    <!-- Icon and Color Row -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Icon -->
      <div>
        <label
          class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        >
          {{ $t("categories.form.icon") || "Icon" }}
        </label>
        <USelectMenu
          v-model="formData.icon"
          :options="iconOptions"
          placeholder="Select an icon"
          value-attribute="value"
          option-attribute="label"
          autocomplete="off"
        >
          <template #label>
            <div v-if="formData.icon" class="flex items-center space-x-2">
              <UIcon :name="formData.icon" class="h-4 w-4" />
              <span>{{ getIconLabel(formData.icon) }}</span>
            </div>
            <span v-else>Select an icon</span>
          </template>

          <template #option="{ option }">
            <div class="flex items-center space-x-2">
              <UIcon :name="option.value" class="h-4 w-4" />
              <span>{{ option.label }}</span>
            </div>
          </template>
        </USelectMenu>
      </div>

      <!-- Color -->
      <div>
        <label
          class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        >
          {{ $t("categories.form.color") || "Color" }}
        </label>
        <div class="flex flex-wrap gap-2">
          <button
            v-for="color in colorOptions"
            :key="color.value"
            type="button"
            :class="[
              'w-8 h-8 rounded-full border-2 transition-all flex items-center justify-center',
              formData.color === color.value
                ? 'border-gray-400 ring-2 ring-gray-300'
                : 'border-gray-200 hover:border-gray-300',
            ]"
            :style="{ backgroundColor: color.value }"
            :title="color.name"
            @click="formData.color = color.value"
          >
            <UIcon
              v-if="formData.icon && formData.color === color.value"
              :name="formData.icon"
              class="h-4 w-4 text-white"
            />
          </button>
        </div>
        <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Preview how your icon looks with different colors
        </p>
      </div>
    </div>

    <!-- Preview -->
    <div
      v-if="formData.name"
      class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4"
    >
      <label
        class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
      >
        Preview
      </label>
      <div class="flex items-center space-x-3">
        <div
          class="h-10 w-10 rounded-full flex items-center justify-center"
          :style="{ backgroundColor: formData.color }"
        >
          <UIcon
            v-if="formData.icon"
            :name="formData.icon"
            class="h-5 w-5 text-white"
          />
        </div>
        <div>
          <h3 class="text-sm font-medium text-gray-900 dark:text-white">
            {{ formData.name }}
          </h3>
          <p
            v-if="formData.description"
            class="text-sm text-gray-500 dark:text-gray-400"
          >
            {{ formData.description }}
          </p>
        </div>
      </div>
    </div>

    <!-- Form Actions -->
    <div
      class="flex justify-end space-x-3 pt-6 border-t border-gray-200 dark:border-gray-700"
    >
      <UButton
        type="button"
        variant="ghost"
        color="gray"
        :label="$t('ui.cancel') || 'Cancel'"
        @click="$emit('cancel')"
      />
      <UButton
        type="submit"
        color="primary"
        :loading="loading"
        :label="$t('categories.form.save') || 'Save Category'"
        icon="lucide:save"
      />
    </div>
  </form>
</template>

<script setup lang="ts">
import { THOUGHT_COLORS } from "@/utils/constants";

// Props
interface Props {
  initialData?: {
    name?: string;
    description?: string;
    icon?: string;
    color?: string;
  };
  loading?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
});

// Emits
const emit = defineEmits<{
  submit: [
    data: {
      name: string;
      description?: string;
      icon?: string;
      color: string;
    }
  ];
  cancel: [];
}>();

// Form data
const formData = ref({
  name: "",
  description: "",
  icon: "lucide:folder",
  color: THOUGHT_COLORS[0].value,
  ...props.initialData,
});

// Form state
const errors = ref<Record<string, string>>({});

// Icon options - popular icons for categories
const iconOptions = [
  { value: "lucide:folder", label: "Folder" },
  { value: "lucide:user", label: "Personal" },
  { value: "lucide:briefcase", label: "Work" },
  { value: "lucide:lightbulb", label: "Ideas" },
  { value: "lucide:heart", label: "Favorites" },
  { value: "lucide:star", label: "Important" },
  { value: "lucide:book-open", label: "Learning" },
  { value: "lucide:coffee", label: "Casual" },
  { value: "lucide:target", label: "Goals" },
  { value: "lucide:rocket", label: "Projects" },
  { value: "lucide:camera", label: "Creative" },
  { value: "lucide:music", label: "Music" },
  { value: "lucide:palette", label: "Art" },
  { value: "lucide:code", label: "Programming" },
  { value: "lucide:dollar-sign", label: "Finance" },
  { value: "lucide:home", label: "Home" },
  { value: "lucide:car", label: "Travel" },
  { value: "lucide:gamepad-2", label: "Gaming" },
  { value: "lucide:dumbbell", label: "Fitness" },
  { value: "lucide:utensils", label: "Food" },
];

// Color options
const colorOptions = THOUGHT_COLORS;

// Methods
const getIconLabel = (iconValue: string): string => {
  const option = iconOptions.find((opt) => opt.value === iconValue);
  return option?.label || "Unknown";
};

const validateForm = (): boolean => {
  errors.value = {};

  if (!formData.value.name.trim()) {
    errors.value.name = "Category name is required";
  } else if (formData.value.name.length > 50) {
    errors.value.name = "Category name cannot exceed 50 characters";
  }

  if (formData.value.description && formData.value.description.length > 200) {
    errors.value.description = "Description cannot exceed 200 characters";
  }

  return Object.keys(errors.value).length === 0;
};

const handleSubmit = () => {
  if (validateForm()) {
    emit("submit", { ...formData.value });
  }
};

// Watch for initial data changes
watch(
  () => props.initialData,
  (newData) => {
    if (newData) {
      Object.assign(formData.value, newData);
    }
  },
  { deep: true }
);
</script>
