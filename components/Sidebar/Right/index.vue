<template>
  <div class="flex flex-col">
    <SidebarRightCards title="What's happening">
      <SidebarRightCardsItem v-for="item in whatsHappening">
        <h2 class="font-bold text-gray-800 text-md dark:text-white">
          {{ item.title }}
        </h2>
        <p class="text-xs text-gray-400">
          {{ item.count }}
        </p>
      </SidebarRightCardsItem>
    </SidebarRightCards>
    <SidebarRightCards title="Who to follow">
      <SidebarRightCardsItem v-for="item in whoToFollow">
        <div class="flex flex-row items-center justify-between p-2">
          <div class="flex flex-row">
            <img
              class="w-10 h-10 rounded-full"
              :src="item.image"
              :alt="item.name"
            />
            <div class="flex flex-col ml-2">
              <div class="font-bold text-sm dark:text-white">
                {{ item.name }}
              </div>
              <div class="text-xs text-gray-400">{{ item.handle }}</div>
            </div>
          </div>
          <div class="flex h-full">
            <button
              class="px-4 text-white py-2 bg-zinc-900 rounded-full font-bold hover:bg-zinc-700"
              :class="buttonTransition"
            >
              Follow
            </button>
          </div>
        </div>
      </SidebarRightCardsItem>
    </SidebarRightCards>
  </div>
</template>
<script setup>
const { buttonTransition } = useTailwindConfig();
const whatsHappening = ref([
  {
    title: 'SpaceX',
    count: '18.8k Tweets',
  },
  {
    title: 'Bruno Mars',
    count: '186k Tweets',
  },
  {
    title: 'SmgTR',
    count: '32M Tweets',
  },
]);
const whoToFollow = ref([
  {
    name: 'SpaceX',
    handle: '@SpaceX',
    image: 'https://picsum.photos/200/200',
  },
  {
    name: 'Bruno Mars',
    handle: '@Bruno Mars',
    image: 'https://picsum.photos/200/200',
  },
  {
    name: 'SmgTR',
    handle: '@SmgTR',
    image: 'https://picsum.photos/200/200',
  },
]);
</script>
