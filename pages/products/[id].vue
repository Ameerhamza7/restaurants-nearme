<template>
  <div class="flex justify-center p-24">
  <div class=" flex flex-col items-center w-[30%] border-r-2 mt-5">
    <p class="width-[30%] font-medium mb-5 bg-[#e2e2e2] px-[7.5rem] py-2 rounded" >NEARBY PLACES</p>
    <div class=" flex items-center w-[22rem] h-[8rem] px-2 my-5 rounded-lg drop-shadow-lg overflow-hidden bg-white "  v-for="item in filter.relatedProduct" :key="item.dataId">
      <div class="flex items-center">
        <div class=" px-4 ">
          <div class="flex items-center mb-3">
            <p class=" truncate w-[19rem] text-lg font-medium" >{{ item.title }}</p>
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
    <div class="flex w-[70%] px-[5rem] ">
      <div class="flex flex-col items-center">
          <h1 class="text-xl pr-[25rem] text-start font-medium mb-5"></h1>
        <div class=" items-center bg-[white] rounded-xl drop-shadow-md w-fit overflow-hidden" >
          <div v-if="filter.findProduct?.img">
          <img
          :src="`${filter.findProduct?.img}`"
          alt="img"
          class=" w-[35rem] h-[18rem] object-cover"
        />
      </div>
        <div class="p-6">
          <div class="flex items-center text-lg  mb-5">
            <!-- <p class="font-medium pr-2 truncate"></p> -->
            <p class=" text-xl font-medium">{{ filter.findProduct?.title }}</p>
            <br />
          </div>
          <div class="flex items-center text-lg mb-2" v-if="filter.findProduct?.address">
            <Icon name="ic:outline-location-on" color="orange" class="text-2xl mr-3 " />
            {{ filter.findProduct?.address }}
          </div>
          <div class="flex items-center text-lg mb-2">
            <Icon name="ic:baseline-access-time" color="orange" class="text-2xl mr-3 " v-if="filter.findProduct?.description"/>
            {{ filter.findProduct?.description }}
          </div>
          <div class="flex items-center text-lg" v-if="filter.findProduct?.extra_services">
            <Icon name="mdi:room-service-outline" color="orange" class="text-2xl mr-3 " />
            {{ filter.findProduct?.extra_services }}
          </div>

          <div class="flex justify-center mt-5 w-[28rem] bg-[#eeeeee] py-6 rounded-lg" >
          <div class="flex items-center text-lg pr-4 ">
            <p class="font-medium pr-2">Rating:</p>
            {{ filter.findProduct?.avg_rating }}
            <Icon name="ic:round-star" color="orange" class="text-lg" />
          </div>
          <div class="flex items-center text-lg px-4 border-l-[1px] border-[#d4d4d4]">
            <p class="font-medium pr-2">Category:</p>
            {{ filter.findProduct?.category }}
          </div>
          <div class="flex items-center text-lg pl-4 border-l-[1px] border-[#d4d4d4]">
            <p class="font-medium pr-2">reviews:</p>
            {{ filter.findProduct?.reviews }}
          </div>
        </div>

        </div>
      </div>
    </div>
    </div>
  </div>
</template>

<script setup>
import { useFilterStore } from '../../stores/filter.js';
const filter = useFilterStore();
const router = useRouter();

const data = ref("");


onMounted(() => {
  const saveData = localStorage.getItem("data");
  if (saveData) {
    data.value = JSON.parse(saveData);
  }

  filter.filteredProduct();
  filter.relatedData();
});

function openDetail(title){
    router.push(`/products/${title}`)
}
</script>

<style scoped>

</style>