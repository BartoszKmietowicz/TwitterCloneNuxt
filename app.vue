<template>
  <div :class="{ dark: darkMode }">
    <div class="bg-white dark:bg-dim-900 py-6">
      <LoadingPage v-if="isAuthLoading"/>
      <div v-else-if="user" class="min-h-full">
        <div
          class="grid grid-cols-12 mx-auto sm:px-6 lg:max-w-7xl lg:px-4 lg:gap-5"
        >
        </div>
          <!-- LEFT -->
          <div class="hidden md:block xs-col-span-1 xl:col-span-2">
            <div class="sticky top-0">
              <SidebarLeft />
            </div>
          </div>
          <!-- Main  -->
          <main class="col-span-12 md:col-span-8 xl:col-span-6">
            <router-view />
          </main>

          <!-- Right -->
          <div class="hidden col-span-12 md:block xl:col-span-4 md:col-span-3">
            <SidebarRight />
          </div>
        </div>
     

      <AuthPage v-else/>
    </div>
  </div>
</template>
<script setup>
const darkMode = useState('darkMode', () => true);
const {useAuthUser,initializeAuthentication,useAuthIsLoading}=useAuth();
const isAuthLoading= useAuthIsLoading();
const user = useAuthUser()

onBeforeMount(()=>{
  initializeAuthentication();
})
</script>
