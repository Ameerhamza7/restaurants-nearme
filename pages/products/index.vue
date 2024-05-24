<template>
  <div class="flex items-center justify-center relative my-6">
    <div class="w-[80vw] h-[40vh] overflow-hidden rounded-3xl">
      <img src="/public/bg1.jpeg" alt="" class="" />
    </div>
    <div
      class="flex items-center justify-center w-[50%] absolute">
      <!-- <input type="text" class="p-[1rem] rounded-l-lg" /> -->
      <input type="text" v-model="searchedProduct"class="rounded-l-lg border-r-[2px] w-[18rem] bg-white py-4 px-5" placeholder="Search  Restaurants, Hospitals">
      <Dropdown v-model="selectedCity" :cities="cities" />
      <div
        class="flex justify-center items-center py-[14px] px-3 bg-[#FF9F1C] rounded-r-lg border-l-[2px] cursor-pointer hover:scale-[102%] transition-all duration-75" @click="fetch">
        <p class="px-2 text-xl text-[white]">Search</p>
        <Icon
          name="material-symbols:my-location"
          color="white"
          class="text-2xl"
        />
      </div>
    </div>
  </div>
  <h1 class="text-center text-2xl font-medium mb-2 mt-10">Results</h1>
  <!-- <div v-if="data !== ''" class="px-[12rem] flex">
    {{searchedProduct}} in<p class="font-medium pl-1">'{{ selectedCity.name }}'</p>
  </div> -->
  <div class="grid grid-cols-3 place-items-center mx-[10rem]">
    <div class=" flex items-center w-[30rem] h-[8rem] px-2 m-5 rounded-lg drop-shadow-lg overflow-hidden bg-white "  v-for="item in data" :key="item.dataId">
      <div class="flex items-center">
        <div class="w-[10rem] h-[7rem] overflow-hidden rounded-lg" v-if="item.img">
          <img
          :src="`${item.img}`"
          alt="img"
          class=" w-[10rem] h-[7rem] object-cover"
          />
        </div>
        <div class=" px-4 ">
          <div class="flex items-center mb-3">
            <!-- <p class="font-medium pr-2 ">Name:</p> -->
            <p class=" truncate w-[27rem] text-lg font-medium" v-if="!item.img">{{ item.title }}</p>
            <p class=" truncate w-[17rem] text-lg font-medium" v-if="item.img">{{ item.title }}</p>
            <br />
          </div>
          <div class="flex items-center justify-between">
            <div class="flex items-center ">
              <p class="text-lg pr-2">Rating:</p>
              <p class="text-lg font-medium" >{{ item.avg_rating }}</p>
              <Icon name="ic:round-star" color="orange" class="text-xl ml-1" />
            </div>
            <nuxt-link class="cursor-pointer" @click="openDetail(item.title)" >
          <div class=" py-1 px-4 bg-[#eeeeee] rounded-md hover:bg-[#FF9F1C] hover:text-white transition-all duration-75">Visit</div>
        </nuxt-link>
        </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
const router = useRouter();

const data = ref("");
const selectedCity = ref();
const searchedProduct= ref('');
console.log(typeof searchedProduct);

const cities = [
  {name: 'Rawalpindi', lat: 33.6079744 , lng: 73.0180172 },
  {name: 'lahore', lat: 31.582045 , lng: 74.329376 },
  {name: 'Multan', lat: 30.181459 , lng: 71.492157 },
  {name: 'Karachi', lat: 24.860966 , lng: 66.990501 },
]


const fetch = async () => {
  if(!selectedCity.value) returns;
    const {lat, lng} = selectedCity.value;
    const search = searchedProduct.value;
    console.log(search);
  axios.post("http://localhost:8888/", {lat, lng, search})
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
