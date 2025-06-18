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
        :error="!!(errors.title && errors.title.length)"
        autocomplete="off"
        required
      />
      <p
        v-if="errors.title && errors.title.length"
        class="mt-1 text-sm text-red-600 dark:text-red-400"
      >
        {{ errors.title[0] }}
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
        :error="!!(errors.content && errors.content.length)"
        autocomplete="off"
        required
      />
      <p
        v-if="errors.content && errors.content.length"
        class="mt-1 text-sm text-red-600 dark:text-red-400"
      >
        {{ errors.content[0] }}
      </p>
    </div>

    <!-- Color Row -->
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
            'w-8 h-8 rounded-full border-2 transition-all cursor-pointer',
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
          :error="!!tagError"
          autocomplete="off"
          @keyup.enter="addTag"
          @keyup="handleTagKeyup"
        />
        <p v-if="tagError" class="mt-1 text-sm text-red-600 dark:text-red-400">
          {{ tagError }}
        </p>
        <p
          v-else-if="errors.tags && errors.tags.length"
          class="mt-1 text-sm text-red-600 dark:text-red-400"
        >
          {{ errors.tags[0] }}
        </p>
        <p v-else class="text-xs text-gray-500 dark:text-gray-400">
          Press Enter or comma to add tags (max 10)
        </p>
      </div>
    </div>

    <!-- Form Actions -->
    <div
      class="flex justify-end pt-6 border-t border-gray-200 dark:border-gray-700"
    >
      <div class="flex gap-2 justify-end">
        <UButton
          class="cursor-pointer"
          color="neutral"
          variant="ghost"
          label="Cancel"
          @click="handleClose"
        />
        <UButton
          color="primary"
          :label="$t('thoughts.form.save') || 'Save Thought'"
          icon="lucide:save"
          class="cursor-pointer"
          :loading="loading"
          @click="handleSubmit"
        />
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
import { THOUGHT_COLORS } from "@/utils/constants";
import { thoughtSchema, validateData, validateTag } from "@/utils/validation";

// Props
const props = defineProps({
  initialData: {
    type: Object,
    default: () => ({}),
  },
  loading: {
    type: Boolean,
    default: false,
  },
});

// Emits
const emit = defineEmits(["submit", "close"]);

// Form data
const formData = ref({
  title: "",
  content: "",
  color: THOUGHT_COLORS[0].value,
  tags: [],
  ...props.initialData,
});

// Form state
const errors = ref({});
const newTag = ref("");
const tagError = ref("");

// Color options
const colorOptions = THOUGHT_COLORS;

// Methods
const validateForm = () => {
  const validation = validateData(thoughtSchema, formData.value);

  if (validation.success) {
    errors.value = {};
    return true;
  } else {
    errors.value = validation.errors || {};
    return false;
  }
};

const addTag = () => {
  const tag = newTag.value.trim().replace(",", "");

  if (!tag) {
    tagError.value = "";
    return;
  }

  // Validate individual tag
  const tagValidation = validateTag(tag);
  if (!tagValidation.valid) {
    tagError.value = tagValidation.error || "Invalid tag";
    return;
  }

  // Check if tag already exists
  if (formData.value.tags.includes(tag)) {
    tagError.value = "Tag already exists";
    return;
  }

  // Check tag limit
  if (formData.value.tags.length >= 10) {
    tagError.value = "Maximum 10 tags allowed";
    return;
  }

  // Add tag
  formData.value.tags.push(tag);
  newTag.value = "";
  tagError.value = "";

  // Clear any previous tags validation error
  if (errors.value.tags) {
    const newErrors = { ...errors.value };
    delete newErrors.tags;
    errors.value = newErrors;
  }
};

const handleTagKeyup = (event) => {
  if (event.key === "," || event.code === "Comma") {
    event.preventDefault();
    addTag();
  }

  // Clear tag error when user starts typing
  if (tagError.value && newTag.value.trim()) {
    tagError.value = "";
  }
};

const removeTag = (index) => {
  formData.value.tags.splice(index, 1);

  // Clear tags validation error if it exists
  if (errors.value.tags) {
    const newErrors = { ...errors.value };
    delete newErrors.tags;
    errors.value = newErrors;
  }
};

const handleClose = () => {
  emit("close", false);
};

const handleSubmit = () => {
  const isValid = validateForm();

  if (isValid) {
    emit("submit", { ...formData.value });
  }
};

// Real-time validation
const clearFieldError = (field) => {
  if (errors.value[field]) {
    const newErrors = { ...errors.value };
    newErrors[field] = undefined;
    errors.value = newErrors;
  }
};

// Watch for initial data changes
watch(
  () => props.initialData,
  (newData) => {
    if (newData) {
      Object.assign(formData.value, newData);
      // Clear errors when data changes
      errors.value = {};
    }
  },
  { deep: true }
);

// Clear errors when user types
watch(
  () => formData.value.title,
  () => clearFieldError("title")
);
watch(
  () => formData.value.content,
  () => clearFieldError("content")
);
watch(
  () => formData.value.color,
  () => clearFieldError("color")
);
</script>
