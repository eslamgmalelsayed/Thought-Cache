<template>
  <header
    class="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700"
  >
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 justify-between">
        <!-- Left section -->
        <div class="flex items-center">
          <!-- App logo/title -->
          <div class="flex items-center">
            <UIcon name="lucide:lightbulb" class="h-8 w-8 text-primary-600" />
            <h1 class="ml-3 text-xl font-bold text-gray-900 dark:text-white">
              {{ $t("app.name") || "Thought Cache" }}
            </h1>
          </div>
        </div>

        <!-- Center section - Search -->

        <!-- Right section -->
        <div class="flex items-center space-x-4">
          <!-- Quick actions -->
          <UButton
            icon="lucide:plus"
            color="primary"
            variant="solid"
            :label="$t('thoughts.add')"
            class="hidden sm:flex"
            @click="emit('add-thought')"
          />

          <!-- Mobile add button -->
          <UButton
            icon="lucide:plus"
            color="primary"
            variant="solid"
            class="sm:hidden"
            @click="emit('add-thought')"
          />

          <!-- User Avatar & Preferences -->
          <div v-if="isLoaded" class="relative">
            <!-- Avatar Button -->
            <UButton
              variant="ghost"
              color="gray"
              class="p-1 cursor-pointer"
              @click="toggleUserMenu"
            >
              <div class="flex items-center">
                <div
                  v-if="avatarUrl"
                  class="h-8 w-8 rounded-full overflow-hidden ring-2 ring-gray-200 dark:ring-gray-600"
                >
                  <img
                    :src="avatarUrl"
                    :alt="userDisplayName"
                    class="w-full h-full object-cover"
                    @error="onImageError"
                    @load="onImageLoad"
                  />
                </div>
                <div
                  v-else
                  class="h-8 w-8 rounded-full bg-primary-600 flex items-center justify-center ring-2 ring-gray-200 dark:ring-gray-600"
                >
                  <span class="text-white text-sm font-medium">
                    {{ userInitials }}
                  </span>
                </div>
              </div>
            </UButton>

            <!-- Dropdown Menu -->
            <div
              v-if="showUserMenu"
              class="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50"
            >
              <div class="p-3">
                <!-- Theme Toggle -->
                <div class="flex items-center justify-between py-2">
                  <div class="flex items-center">
                    <UIcon
                      :name="themeIcon"
                      class="h-4 w-4 text-gray-500 mr-2"
                    />
                    <span class="text-sm text-gray-700 dark:text-gray-300">
                      {{ t("ui.theme.system") || "Theme" }}
                    </span>
                  </div>
                  <UButton
                    variant="outline"
                    color="gray"
                    size="xs"
                    :icon="themeIcon"
                    @click="toggleTheme"
                    class="capitalize cursor-pointer"
                  >
                    {{ colorMode.preference }}
                  </UButton>
                </div>

                <!-- Language Toggle -->
                <div class="flex items-center justify-between py-2">
                  <div class="flex items-center">
                    <UIcon
                      name="lucide:globe"
                      class="h-4 w-4 text-gray-500 mr-2"
                    />
                    <span class="text-sm text-gray-700 dark:text-gray-300">
                      {{ t("nav.language") || "Language" }}
                    </span>
                  </div>
                  <UButton
                    variant="outline"
                    color="gray"
                    size="xs"
                    @click="toggleLanguage"
                    class="min-w-[60px] cursor-pointer"
                  >
                    {{ currentLanguage?.label || "EN" }}
                  </UButton>
                </div>

                <hr class="my-2 border-gray-200 dark:border-gray-700" />

                <!-- Sign Out -->
                <UButton
                  variant="ghost"
                  color="red"
                  icon="lucide:log-out"
                  @click="handleSignOut"
                  class="w-full justify-start cursor-pointer"
                >
                  {{ t("auth.signOut") || "Sign Out" }}
                </UButton>
              </div>
            </div>
          </div>
          <!-- Loading state -->
          <div
            v-else
            class="h-8 w-8 rounded-full bg-gray-300 animate-pulse"
          ></div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { LANGUAGE_OPTIONS } from "@/utils/constants";

// User authentication
const { user, signOut, isLoaded } = useAuth();

// User menu state
const showUserMenu = ref(false);

const toggleUserMenu = () => {
  showUserMenu.value = !showUserMenu.value;
};

// Close menu when clicking outside
if (import.meta.client) {
  onMounted(() => {
    document.addEventListener("click", (e) => {
      const target = e.target;
      if (!target.closest(".relative")) {
        showUserMenu.value = false;
      }
    });
  });
}

// Debug user object
watch(
  () => user?.value,
  (newUser) => {
    try {
      if (newUser) {
        console.log("User object:", newUser);
        console.log("Image URLs:", {
          imageUrl: newUser.imageUrl,
          profileImageUrl: newUser.profileImageUrl,
          hasImage: !!(newUser.imageUrl || newUser.profileImageUrl),
        });
      }
    } catch (error) {
      console.error("Error in user watcher:", error);
    }
  },
  { immediate: true }
);

// Image loading handlers
const onImageError = (event) => {
  console.error("Avatar image failed to load:", event.target.src);
  console.log("User object at error:", user.value);
};

const onImageLoad = (event) => {
  console.log("Avatar image loaded successfully:", event.target.src);
};

// Computed properties for user display
const avatarUrl = computed(() => {
  if (!user || !user.value) return null;

  try {
    // Try different possible image properties from Clerk
    return (
      user.value.imageUrl ||
      user.value.profileImageUrl ||
      user.value.profileImageURL ||
      user.value.avatar ||
      user.value.picture ||
      null
    );
  } catch (error) {
    console.error("Error accessing user avatar:", error);
    return null;
  }
});

const userDisplayName = computed(() => {
  if (!user || !user.value) return "User";

  try {
    return (
      user.value.fullName ||
      user.value.firstName ||
      user.value.name ||
      user.value.username ||
      "User"
    );
  } catch (error) {
    console.error("Error accessing user display name:", error);
    return "User";
  }
});

const userInitials = computed(() => {
  if (!user || !user.value) return "U";

  try {
    const firstName = user.value.firstName || "";
    const lastName = user.value.lastName || "";

    if (firstName && lastName) {
      return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
    } else if (firstName) {
      return firstName.charAt(0).toUpperCase();
    } else if (user.value.fullName) {
      const names = user.value.fullName.split(" ");
      if (names.length >= 2) {
        return `${names[0].charAt(0)}${names[names.length - 1].charAt(
          0
        )}`.toUpperCase();
      }
      return names[0].charAt(0).toUpperCase();
    } else if (user.value.username) {
      return user.value.username.charAt(0).toUpperCase();
    }

    return "U";
  } catch (error) {
    console.error("Error accessing user initials:", error);
    return "U";
  }
});

// Theme management
const colorMode = useColorMode();
const themeIcon = computed(() => {
  switch (colorMode.value) {
    case "light":
      return "lucide:sun";
    case "dark":
      return "lucide:moon";
    default:
      return "lucide:monitor";
  }
});

const toggleTheme = () => {
  const themes = ["light", "dark", "system"];
  const currentIndex = themes.indexOf(colorMode.preference);
  const nextIndex = (currentIndex + 1) % themes.length;
  colorMode.preference = themes[nextIndex];
};

// Language management
const { locale, setLocale, t } = useI18n();

const currentLanguage = computed(() => {
  return (
    LANGUAGE_OPTIONS.find((lang) => lang.value === locale.value) ||
    LANGUAGE_OPTIONS[0]
  );
});

const toggleLanguage = () => {
  const newLocale = locale.value === "en" ? "ar" : "en";
  setLocale(newLocale);
};

// Sign out handler
const handleSignOut = async () => {
  try {
    await signOut();
    await navigateTo("/sign-in");
  } catch (error) {
    console.error("Sign out error:", error);
  }
};
</script>
