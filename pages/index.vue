<template>
  <div class="relative mb-8">
    <div class="w-[100vw] h-[45vh] overflow-hidden bg-[#FF9F1C]">
      <img src="/public/bg1.jpeg" alt="" class="opacity-90" />
    </div>
    <div
      class="flex items-center justify-center w-[50%] absolute top-2/4 left-[25%]"
    >
      <input type="text" class="p-[1rem] rounded-l-lg" />
      <div
        class="flex justify-center items-center py-[14px] px-3 bg-[#FF9F1C] rounded-r-lg border-l-[2px] cursor-pointer"
        @click="press"
      >
        <p class="px-2 text-xl text-[white]">Search</p>
        <Icon
          name="material-symbols:my-location"
          color="white"
          class="text-2xl"
        />
      </div>
    </div>
  </div>
  <h1 class="text-center text-2xl font-medium">Restaurants</h1>
  <div class="grid grid-cols-3 ">
    <div class=" w-[35rem] m-10 p-3 rounded shadow-lg" v-for="item in data">
      <div class="flex items-center justify-center p-2">
        <img :src="`${item.img}`" alt="img" class="rounded w-[15rem] h-[8rem] border-[2px] border-[#f3ba69]" />
        <div class="px-4">
          Name: {{ item.title }} <br />
          Adress: {{ item.address }}
        </div>
      </div>
    </div>
  </div>
  <!-- <div v-if="loading">Loading...</div>
    <div v-else>
      <ul>
        <li v-for="place in data" :key="place.dataId">{{ place.title }}</li>
      </ul>
    </div> -->
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const data = ref("");

const press = async () => {
  axios
    .get("http://localhost:8888/api")
    .then((map) => {
      console.log(map.data);
      data.value = map.data;

      localStorage.setItem("data", JSON.stringify(map.data));
    })
    .catch((error) => {
      console.log(error);
    });
};

onMounted(() => {
  const saveData = localStorage.getItem("data");
  if (saveData) {
    data.value = JSON.parse(saveData);
  }
});

// onMounted(fetchData);
</script>

<style scoped></style>
