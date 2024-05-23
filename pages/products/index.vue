<template>
  <div class="relative mb-8">
    <div class="w-[100vw] h-[45vh] overflow-hidden bg-[#FF9F1C]">
      <img src="/public/bg1.jpeg" alt="" class="opacity-90" />
    </div>
    <div
      class="flex items-center justify-center w-[50%] absolute top-2/4 left-[25%]"
    >
      <!-- <input type="text" class="p-[1rem] rounded-l-lg" /> -->
      <Dropdown v-model="selectedCity" :cities="cities" />
      <div
        class="flex justify-center items-center py-[14px] px-3 bg-[#FF9F1C] rounded-r-lg border-l-[2px] cursor-pointer hover:scale-[102%] transition-all duration-75"
        @click="fetch"
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
  <p v-if="data !== ''" class="px-[5rem]">
    Restaurants in {{ selectedCity.name }}
  </p>
  <div class="grid grid-cols-3 place-items-center">
    <div class=" flex items-center w-[30rem] h-[8rem] m-5 rounded-lg drop-shadow-lg overflow-hidden bg-white hover:bg-[#ffdeb0] transition-all duration-75"  v-for="item in data" :key="item.dataId">
      <nuxt-link class="cursor-pointer" @click="openDetail(item.title)" >
      <div class="flex items-center border-2">
        <div class="w-[10rem] h-[8rem] overflow-hidden">
          <img
            :src="`${item.img}`"
            alt="img"
            class=" w-[10rem] h-[8rem] object-cover"
          />
        </div>
        <div class=" px-4">
          <div class="flex items-center text-lg">
            <p class="font-medium pr-2 ">Name:</p>
            <p class=" truncate w-[14rem]">{{ item.title }}</p>
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
const selectedCity = ref()

const cities = [
  {name: 'Rawalpindi', lat: 33.6079744 , lng: 73.0180172 },
  {name: 'lahore', lat: 31.582045 , lng: 74.329376 },
  {name: 'Multan', lat: 30.181459 , lng: 71.492157 },
  {name: 'Karachi', lat: 24.860966 , lng: 66.990501 },
]


const fetch = async () => {
  if(!selectedCity.value) returns;
    const {lat, lng} = selectedCity.value
  axios.post("http://localhost:8888/", {lat,lng})
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
  const saveCity = localStorage.getItem('selectedCity')
  if (saveData) {
    data.value = JSON.parse(saveData);
  }
  if(saveCity){
    selectedCity.value = JSON.parse(saveCity)
  }
});

function openDetail(title){
    router.push(`/products/${title}`)
}

</script>

<style scoped>
.title {
  width: 230px; 
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

</style>
