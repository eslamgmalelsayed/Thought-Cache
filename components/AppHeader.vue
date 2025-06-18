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
          <!-- User Avatar & Preferences -->
          <div v-if="isLoaded && isSignedIn" class="relative">
            <!-- Avatar Button -->
            <div
              class="cursor-pointer"
              @click="toggleUserMenu"
            >
              <div v-if="avatarUrl" class="relative">
                <img
                  :src="avatarUrl"
                  :alt="userDisplayName"
                  class="h-10 w-10 rounded-full object-cover ring-2 ring-gray-200 dark:ring-gray-600 hover:ring-primary-500 transition-all duration-200"
                  @error="onImageError"
                  @load="onImageLoad"
                >
              </div>
              <div v-else class="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center ring-2 ring-gray-200 dark:ring-gray-600 hover:ring-primary-500 transition-all duration-200">
                <span class="text-white text-sm font-medium">
                  {{ userInitials }}
                </span>
              </div>
            </div>

            <!-- Dropdown Menu -->
            <div
              v-if="showUserMenu"
              class="absolute right-0 top-full mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50"
            >
              <div class="p-4">
                <!-- User Info Section -->
                <div class="pb-3 border-b border-gray-200 dark:border-gray-700">
                  <p class="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {{ userDisplayName }}
                  </p>
                  <p class="text-xs text-gray-500 dark:text-gray-400 truncate">
                    {{ userEmail }}
                  </p>
                </div>

                <!-- Settings Section -->
                <div class="pt-3">
                  <!-- Dark Mode Toggle -->
                <div class="flex items-center justify-between py-2">
                  <div class="flex items-center">
                    <UIcon
                      name="lucide:moon"
                      class="h-4 w-4 text-gray-500 mr-2"
                    />
                    <span class="text-sm text-gray-700 dark:text-gray-300">
                      Dark Mode
                    </span>
                  </div>
                  <USwitch
                    unchecked-icon="i-lucide-sun"
                    checked-icon="i-lucide-moon"
                    :model-value="colorMode.value === 'dark'"
                    @update:model-value="toggleDarkMode"
                  />
                </div>

                <!-- Language Toggle -->
                <div class="flex items-center justify-between py-2">
                  <div class="flex items-center">
                    <UIcon
                      name="lucide:globe"
                      class="h-4 w-4 text-gray-500 mr-2"
                    />
                    <span class="text-sm text-gray-700 dark:text-gray-300">
                      English
                    </span>
                  </div>
                  <USwitch
                    unchecked-icon="i-lucide-x"
                    checked-icon="i-lucide-check"
                    :model-value="locale === 'en'"
                    @update:model-value="toggleLanguage"
                  />
                </div>

                <hr class="my-2 border-gray-200 dark:border-gray-700" >

                <!-- Sign Out -->
                <UButton
                  variant="ghost"
                  color="red"
                  icon="lucide:log-out"
                  class="w-full justify-start cursor-pointer"
                  @click="handleSignOut"
                >
                  {{ t("auth.signOut") || "Sign Out" }}
                </UButton>
                </div>
              </div>
            </div>
          </div>
          <!-- Sign In Button for unauthenticated users -->
          <div v-else-if="isLoaded && !isSignedIn">
            <UButton
              color="primary"
              variant="solid"
              @click="navigateTo('/sign-in')"
            >
              Sign In
            </UButton>
          </div>

          <!-- Loading state -->
          <div
            v-else
            class="h-8 w-8 rounded-full bg-gray-300 animate-pulse"
          />
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
// User authentication (auto-imported from @clerk/nuxt)
const { user, isLoaded, isSignedIn } = useAuth();

// Alternative Clerk access
const clerkUser = ref(null);
const clerkLoaded = ref(false);
const clerkSignedIn = ref(false);

// Check Clerk directly
const checkClerkAuth = () => {
  if (import.meta.client && window.Clerk) {
    clerkLoaded.value = window.Clerk.loaded || false;
    clerkSignedIn.value = !!window.Clerk.user;
    clerkUser.value = window.Clerk.user || null;
  }
};

// Watch for Clerk changes
if (import.meta.client) {
  onMounted(() => {
    checkClerkAuth();
    
    // Set up interval to check Clerk status
    const interval = setInterval(() => {
      checkClerkAuth();
    }, 1000);
    
    onUnmounted(() => {
      clearInterval(interval);
    });
  });
}

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



// Image loading handlers
const onImageError = (_event) => {
  // Avatar image failed to load
  _event.target.style.display = 'none';
};

const onImageLoad = (_event) => {
  // Avatar image loaded successfully
};

// Computed properties for user display (using dual auth approach)
const avatarUrl = computed(() => {
  // Try useAuth first
  const authAvatar = user?.value?.imageUrl || user?.value?.profileImageUrl || user?.value?.avatar;
  if (authAvatar) return authAvatar;
  
  // Try direct Clerk access
  const clerkAvatar = clerkUser.value?.imageUrl || clerkUser.value?.profileImageUrl || clerkUser.value?.avatar;
  if (clerkAvatar) return clerkAvatar;
  
  return null;
});

const userDisplayName = computed(() => {
  // Try useAuth first
  const authName = user?.value?.fullName || user?.value?.firstName || user?.value?.name;
  if (authName) return authName;
  
  // Try direct Clerk access
  const clerkName = clerkUser.value?.fullName || clerkUser.value?.firstName || clerkUser.value?.name;
  if (clerkName) return clerkName;
  
  return 'User';
});

const userEmail = computed(() => {
  // Try useAuth first
  const authEmail = user?.value?.emailAddresses?.[0]?.emailAddress || 
                   user?.value?.primaryEmailAddress?.emailAddress ||
                   user?.value?.email;
  if (authEmail) return authEmail;
  
  // Try direct Clerk access - based on the structure you showed
  const clerkEmail = clerkUser.value?.primaryEmailAddress?.emailAddress ||
                    clerkUser.value?.emailAddresses?.[0]?.emailAddress ||
                    clerkUser.value?.email;
  if (clerkEmail) return clerkEmail;
  
  return null;
});

const userInitials = computed(() => {
  // Try useAuth first
  let firstName = user?.value?.firstName || '';
  let lastName = user?.value?.lastName || '';
  
  // Try direct Clerk access if useAuth doesn't have the data
  if (!firstName && !lastName) {
    firstName = clerkUser.value?.firstName || '';
    lastName = clerkUser.value?.lastName || '';
  }
  
  if (firstName && lastName) {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  } else if (firstName) {
    return firstName.charAt(0).toUpperCase();
  } else if (userDisplayName.value && userDisplayName.value !== 'User') {
    const names = userDisplayName.value.split(' ');
    if (names.length >= 2) {
      return `${names[0].charAt(0)}${names[names.length - 1].charAt(0)}`.toUpperCase();
    }
    return names[0].charAt(0).toUpperCase();
  }
  
  return 'U';
});

// Theme management
const colorMode = useColorMode();

const toggleDarkMode = (isDark) => {
  colorMode.preference = isDark ? "dark" : "light";
};

// Language management
const { locale, setLocale, t } = useI18n();

const toggleLanguage = (isEnglish) => {
  const newLocale = isEnglish ? "en" : "ar";
  setLocale(newLocale);
};

// Sign out handler
const handleSignOut = async () => {
  try {
    if (import.meta.client && window.Clerk) {
      await window.Clerk.signOut();
    }
  } finally {
    await navigateTo("/sign-in");
  }
};
</script>
