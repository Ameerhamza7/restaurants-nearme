<template>
    <div class="p-10">
        <h1 class="text-2xl font-medium mb-5">Restaurant detail:</h1>
    <div class="flex items-center ">
        <img
          :src="`${filter.findProduct?.img}`"
          alt="img"
          class="rounded-xl w-[15rem] h-[12rem] object-cover"
        />
        <div class="px-4">
          <div class="flex items-center text-lg">
            <p class="font-medium pr-2 truncate">Name:</p>
            <p class="truncate">{{ filter.findProduct?.title }}</p>
            <br />
          </div>
          <div class="flex items-center text-lg">
            <p class="font-medium pr-2">Rating:</p>
            {{ filter.findProduct?.avg_rating }}
            <Icon name="ic:round-star" color="orange" class="text-lg" />
          </div>
          <div class="flex items-center text-lg">
            <p class="font-medium pr-2">Timing:</p>
            {{ filter.findProduct?.description }}
          </div>
          <div class="flex items-center text-lg">
            <p class="font-medium pr-2">Address:</p>
            {{ filter.findProduct?.address }}
          </div>
          <div class="flex items-center text-lg">
            <p class="font-medium pr-2">Category:</p>
            {{ filter.findProduct?.category }}
          </div>
          <div class="flex items-center text-lg">
            <p class="font-medium pr-2">reviews:</p>
            {{ filter.findProduct?.reviews }}
          </div>
          
        </div>
      </div>
    </div>
</template>

<script setup>
import { useFilterStore } from '../../stores/filter.js';
const filter = useFilterStore();
const data = ref("");


onMounted(() => {
  const saveData = localStorage.getItem("data");
  if (saveData) {
    data.value = JSON.parse(saveData);
  }

  filter.filteredProduct()
});
</script>

<style scoped>

</style>