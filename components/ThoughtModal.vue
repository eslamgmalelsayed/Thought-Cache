<template>
  <UModal
    v-model:open="isOpen"
    :title="props.isEdit ? 'Edit Thought' : 'Add New Thought'"
    :dismissible="false"
    class="p-4"
  >
    <template #content>
      <ThoughtForm
        :initial-data="props.thoughtData"
        :loading="props.loading"
        @submit="handleSubmit"
        @close="handleClose"
      />
    </template>
  </UModal>
</template>

<script setup lang="ts">
// Props
const props = defineProps({
  isOpenModal: {
    type: Boolean,
    default: false,
  },
  isEdit: {
    type: Boolean,
    default: false,
  },
  thoughtData: {
    type: Object,
    default: () => ({}),
  },
  loading: {
    type: Boolean,
    default: false,
  },
});

// Emits
const emit = defineEmits(["close", "submit", "update:modelValue"]);

// Computed for v-model
const isOpen = computed({
  get: () => props.isOpenModal,
  set: (value) => emit("update:modelValue", value),
});

// Methods
const handleSubmit = (data) => {
  emit("submit", data);
};

const handleClose = () => {
  emit("close");
};
</script>
