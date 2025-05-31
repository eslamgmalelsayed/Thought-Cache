<template>
  <form class="space-y-6" @submit.prevent="handleSubmit">
    <!-- Title -->
    <div>
      <label
        for="thought-title"
        class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
      >
        {{ $t("thoughts.form.title") || "Title" }}
        <span class="text-red-500">*</span>
      </label>
      <UInput
        id="thought-title"
        v-model="formData.title"
        :placeholder="$t('thoughts.form.title') || 'Enter thought title...'"
        :error="!!errors.title"
        autocomplete="off"
        required
      />
      <p
        v-if="errors.title"
        class="mt-1 text-sm text-red-600 dark:text-red-400"
      >
        {{ errors.title }}
      </p>
    </div>

    <!-- Content -->
    <div>
      <label
        for="thought-content"
        class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
      >
        {{ $t("thoughts.form.content") || "Content" }}
        <span class="text-red-500">*</span>
      </label>
      <UTextarea
        id="thought-content"
        v-model="formData.content"
        :placeholder="$t('thoughts.form.content') || 'Write your thought...'"
        :rows="5"
        :error="!!errors.content"
        autocomplete="off"
        required
      />
      <p
        v-if="errors.content"
        class="mt-1 text-sm text-red-600 dark:text-red-400"
      >
        {{ errors.content }}
      </p>
    </div>

    <!-- Category and Color Row -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Category -->
      <div>
        <label
          for="thought-category"
          class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        >
          {{ $t("thoughts.form.category") || "Category" }}
        </label>
        <USelectMenu
          v-model="formData.categoryId"
          :options="categoryOptions"
          placeholder="Select a category"
          value-attribute="id"
          option-attribute="name"
          icon="lucide:tag"
          autocomplete="off"
        />
      </div>

      <!-- Color -->
      <div>
        <label
          class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        >
          {{ $t("thoughts.form.color") || "Color" }}
        </label>
        <div class="flex flex-wrap gap-2">
          <button
            v-for="color in colorOptions"
            :key="color.value"
            type="button"
            :class="[
              'w-8 h-8 rounded-full border-2 transition-all',
              formData.color === color.value
                ? 'border-gray-400 ring-2 ring-gray-300'
                : 'border-gray-200 hover:border-gray-300',
            ]"
            :style="{ backgroundColor: color.value }"
            :title="color.name"
            @click="formData.color = color.value"
          />
        </div>
      </div>
    </div>

    <!-- Tags -->
    <div>
      <label
        for="thought-tags"
        class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
      >
        {{ $t("thoughts.form.tags") || "Tags" }}
      </label>
      <div class="space-y-2">
        <!-- Selected tags -->
        <div v-if="formData.tags.length > 0" class="flex flex-wrap gap-2">
          <UBadge
            v-for="(tag, index) in formData.tags"
            :key="`tag-${index}`"
            :label="tag"
            color="primary"
            variant="soft"
            class="cursor-pointer"
            @click="removeTag(index)"
          >
            <template #trailing>
              <UIcon name="lucide:x" class="h-3 w-3" />
            </template>
          </UBadge>
        </div>

        <!-- Tag input -->
        <UInput
          id="thought-tags"
          v-model="newTag"
          :placeholder="$t('tags.placeholder') || 'Enter tag name...'"
          icon="lucide:hash"
          autocomplete="off"
          @keyup.enter="addTag"
          @keyup="handleTagKeyup"
        />
        <p class="text-xs text-gray-500 dark:text-gray-400">
          Press Enter or comma to add tags
        </p>
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
        :label="$t('thoughts.form.save') || 'Save Thought'"
        icon="lucide:save"
      />
    </div>
  </form>
</template>

<script setup lang="ts">
import { THOUGHT_COLORS } from "@/utils/constants";
import type { ThoughtFormData } from "@/types";

// Props
interface Props {
  initialData?: Partial<ThoughtFormData>;
  loading?: boolean;
  categoryOptions?: Array<{ id: string; name: string }>;
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
  categoryOptions: () => [],
});

// Emits
const emit = defineEmits<{
  submit: [data: ThoughtFormData];
  cancel: [];
}>();

// Form data
const formData = ref<ThoughtFormData>({
  title: "",
  content: "",
  color: THOUGHT_COLORS[0].value,
  categoryId: "",
  tags: [],
  ...props.initialData,
});

// Form state
const errors = ref<Record<string, string>>({});
const newTag = ref("");

// Color options
const colorOptions = THOUGHT_COLORS;

// Methods
const validateForm = (): boolean => {
  errors.value = {};

  if (!formData.value.title.trim()) {
    errors.value.title = "Title is required";
  } else if (formData.value.title.length > 200) {
    errors.value.title = "Title cannot exceed 200 characters";
  }

  if (!formData.value.content.trim()) {
    errors.value.content = "Content is required";
  } else if (formData.value.content.length > 5000) {
    errors.value.content = "Content cannot exceed 5000 characters";
  }

  return Object.keys(errors.value).length === 0;
};

const addTag = () => {
  const tag = newTag.value.trim().replace(",", "");
  if (
    tag &&
    !formData.value.tags.includes(tag) &&
    formData.value.tags.length < 10
  ) {
    formData.value.tags.push(tag);
    newTag.value = "";
  }
};

const handleTagKeyup = (event) => {
  if (event.key === "," || event.code === "Comma") {
    event.preventDefault();
    addTag();
  }
};

const removeTag = (index: number) => {
  formData.value.tags.splice(index, 1);
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
