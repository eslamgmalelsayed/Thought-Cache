<template>
  <UApp>
    <div :dir="$i18n.locale === 'ar' ? 'rtl' : 'ltr'">
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </div>
  </UApp>
</template>

<script setup>
// Set page meta
useHead({
  title: "Thought Cache",
  meta: [
    {
      name: "description",
      content: "Capture your brilliant ideas anytime, anywhere",
    },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
  ],
  link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
});
</script>
