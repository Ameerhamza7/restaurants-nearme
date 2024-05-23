<template>
  <div class="flex justify-center">
  <div class=" flex flex-col items-center w-[30%] border-r-2 mt-16">
    <p class="pr-[18rem] text-xl text-start font-medium mb-5" >Nearby restaurants:</p>
    <div class=" flex items-center w-[30rem] h-[8rem] m-5 rounded-lg drop-shadow-lg overflow-hidden bg-white hover:bg-[#ffdeb0] transition-all duration-75"  v-for="item in filter.relatedProduct" :key="item.dataId">
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
    <div class="flex w-[70%] px-[14rem] py-16">
      <div class="flex flex-col items-center">
          <h1 class="text-xl pr-[25rem] text-start font-medium mb-5">Restaurant detail:</h1>
        <div class=" items-center bg-[white] rounded-xl drop-shadow-md w-fit overflow-hidden">
          <img
          :src="`${filter.findProduct?.img}`"
          alt="img"
          class=" w-[35rem] h-[18rem] object-cover"
        />
        <div class="p-6">
          <div class="flex items-center text-lg  mb-5">
            <!-- <p class="font-medium pr-2 truncate"></p> -->
            <p class=" text-xl font-medium">{{ filter.findProduct?.title }}</p>
            <br />
          </div>
          <div class="flex items-center text-lg mb-2">
            <Icon name="ic:outline-location-on" color="orange" class="text-2xl mr-3 " />
            {{ filter.findProduct?.address }}
          </div>
          <div class="flex items-center text-lg mb-2">
            <Icon name="ic:baseline-access-time" color="orange" class="text-2xl mr-3 " />
            {{ filter.findProduct?.description }}
          </div>
          <div class="flex items-center text-lg ">
            <Icon name="mdi:room-service-outline" color="orange" class="text-2xl mr-3 " />
            {{ filter.findProduct?.extra_services }}
          </div>

          <div class="flex  items-center mt-5" >
          <div class="flex items-center text-lg pr-4 ">
            <p class="font-medium pr-2">Rating:</p>
            {{ filter.findProduct?.avg_rating }}
            <Icon name="ic:round-star" color="orange" class="text-lg" />
          </div>
          <div class="flex items-center text-lg px-4 border-l-[1px] ">
            <p class="font-medium pr-2">Category:</p>
            {{ filter.findProduct?.category }}
          </div>
          <div class="flex items-center text-lg pl-4 border-l-[1px]">
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