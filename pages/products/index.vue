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
        class="flex justify-center items-center py-[14px] px-3 bg-[#FF9F1C] rounded-r-lg border-l-[2px] cursor-pointer hover:scale-[102%] transition-all duration-75"
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
  <div class="grid grid-cols-3 place-items-center">
    <div
      class="w-[30rem] m-10 p-3 rounded drop-shadow-lg overflow-hidden bg-white hover:bg-[#ffdeb0] transition-all duration-75"
      v-for="item in data">
      <nuxt-link class="cursor-pointer" @click="openDetail(item.title)" >
      <div class="flex items-center p-2">
        <img
          :src="`${item.img}`"
          alt="img"
          class="rounded-xl w-[9rem] h-[7rem] object-cover"
        />
        <div class="px-4">
          <div class="flex items-center text-lg">
            <p class="font-medium pr-2 truncate">Name:</p>
            <p class="truncate">{{ item.title }}</p>
            <br />
          </div>
          <div class="flex items-center text-lg">
            <p class="font-medium pr-2">Rating:</p>
            {{ item.avg_rating }}
            <Icon name="ic:round-star" color="orange" class="text-lg" />
          </div>
        </div>
      </div>
    </nuxt-link>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
const router = useRouter();

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

function openDetail(title){
    router.push(`/products/${title}`)
}

</script>

<style scoped></style>
