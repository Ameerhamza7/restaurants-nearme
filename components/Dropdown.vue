<template>
    <div class="relative">
      <div class="flex justify-between items-center p-[1rem] w-[12rem] bg-white cursor-pointer" @click="toggleDropdown">
        <span>{{ selectedCity ? selectedCity.name : 'Select your city' }}</span>
        <Icon name="material-symbols:arrow-drop-down" class="" />
      </div>
      <ul v-if="isOpen" class="absolute mt-2 border bg-white w-full z-10">
        <li
          v-for="city in cities"
          :key="city.name"
          @click="selectCity(city)"
          class="p-[1rem] hover:bg-gray-200 cursor-pointer"
        >
          {{ city.name }}
        </li>
      </ul>
    </div>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue';

const props = defineProps({
  cities: Array,
  modelValue: Object
});

const emit = defineEmits(['update:modelValue']);

const isOpen = ref(false);
const selectedCity = ref(props.modelValue);

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const selectCity = (city) => {
  selectedCity.value = city;
  emit('update:modelValue', city);
  isOpen.value = false;
};

watch(selectedCity, (newCity) => {
  if (newCity) {
    localStorage.setItem('selectedCity', JSON.stringify(newCity));
  }
});
  </script>
  
  <style scoped>

  </style>