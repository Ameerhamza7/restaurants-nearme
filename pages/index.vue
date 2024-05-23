<template>
  <div class="relative mb-8">
    <div class="w-[100vw] h-[45vh] overflow-hidden bg-[#FF9F1C]">
      <img src="/public/bg1.jpeg" alt="" class="opacity-90" />
    </div>
    <div class="flex items-center justify-center w-[50%] absolute top-2/4 left-[25%]">
      <!-- <input type="text" class="p-[1rem] rounded-l-lg" /> -->
      <Dropdown v-model="selectedCity" :cities="cities" />
      <div class="flex justify-center items-center py-[15px] px-3 bg-[#FF9F1C] rounded-r-lg border-l-[2px] cursor-pointer hover:scale-[102%] transition-all duration-75"
        @click="fetch">
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
const selectedCity = ref(null)

const cities = [
  {name: 'Rawalpindi', lat: 33.6079744 , lng: 73.0180172 },
  {name: 'lahore', lat: 31.582045 , lng: 74.329376 },
  {name: 'Multan', lat: 30.181459 , lng: 71.492157 },
  {name: 'Karachi', lat: 24.860966 , lng: 66.990501 },
]


const fetch = async () => {
  if(!selectedCity.value) returns;
    const {lat, lng} = selectedCity.value
  router.push('./products/')
  axios.post("http://localhost:8888/",{lat, lng})
    .then((map) => {
      console.log(map.data);
      data.value = map.data;

      localStorage.setItem("data", JSON.stringify(map.data));
    })
    .catch((error) => {
      console.log(error);
    });
  
};


</script>

<style scoped></style>
