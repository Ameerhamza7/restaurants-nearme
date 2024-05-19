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
        <Icon  name="material-symbols:my-location" color="white" class="text-2xl" />
      </div>
    </div>
  </div>
  
  
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
const router = useRouter();

const data = ref("");

const press = async () => {
  router.push('./products/')
  axios.get("https://restaurant-nearme.netlify.app/.netlify/functions/proxy/path-to-resource")
    .then((map) => {
      console.log(map.data);
      data.value = map.data;

      localStorage.setItem("data", JSON.stringify(map.data));
    })
    .catch((error) => {
      console.log(error);
    });
};


// onMounted(fetchData);
</script>

<style scoped></style>
