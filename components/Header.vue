<template>
    <div class="flex items-center px-10 w-full h-[4rem] bg-[white] shadow-sm border-b-[1px]">
        <nuxt-link to="/">
        <div class="h-full flex items-center hover:scale-105 transition-all duration-100 ease-in cursor-pointer">
            <p class=" font-medium text-lg text-white bg-[#FF9F1C] py-2 px-3 rounded-md">Restaurants</p>
            <p class=" font-medium text-lg py-3 px-1 rounded-md">Nearme</p>
        </div>
    </nuxt-link>

    <div class="flex items-center justify-center pr-[10rem] gap-6 w-full h-full text-[#222222] text-lg font-medium">
    <nuxt-link to="/" class="rounded px-4 flex items-center h-3/4 hover:bg-[#e9e9e9] transition-all duration-75 ease-in">
        <h1>HOME</h1>
    </nuxt-link>

    <nuxt-link to="/products" class="rounded px-4 flex items-center h-3/4 hover:bg-[#e9e9e9] transition-all duration-75 ease-in">
        <h1>RESTAURANTS</h1>
    </nuxt-link>
    </div>

    </div>

</template>

<script setup>

</script>

<style scoped>

</style>