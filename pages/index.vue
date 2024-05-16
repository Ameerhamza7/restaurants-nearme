<template>
   <!-- <div>
      <div class="w-[100vw] h-[65vh] overflow-hidden bg-[#e7b13c]">
         <img src="/public/bg1.jpeg" alt="" class="opacity-50">
      </div> 
   </div> -->
<div class=" cursor-pointer" @click="press">
   Click
   <p  v-for="item in data" class="p-2 bg-orange-300">
      <img :src='`${item.img}`' alt="">
      Title:{{item.title}} <br> Adress:{{ item.address }}
   </p>
</div>
   <!-- <div v-if="loading">Loading...</div>
    <div v-else>
      <ul>
        <li v-for="place in data" :key="place.dataId">{{ place.title }}</li>
      </ul>
    </div> -->
  
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const data = ref('');

const press = async()=>{
   axios.get('http://localhost:8888/api')
     .then(map => {
       console.log(map.data);
       data.value = map.data;

       localStorage.setItem( 'data', JSON.stringify(map.data))
     })
     .catch(error => {
       console.log(error);
     });
}

onMounted(()=>{
   const saveData = localStorage.getItem( 'data')
   if (saveData){
      data.value = JSON.parse(saveData)
   }

})

// onMounted(fetchData);

</script>

<style scoped>
</style>
