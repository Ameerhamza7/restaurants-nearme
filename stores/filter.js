import { defineStore } from 'pinia';

export const useFilterStore = defineStore({
  id: 'maps',
  state: () => ({
    detailProduct: null,
    findProduct: null

  }),
  getters:{

  },
  actions: {
    filteredProduct(){
      let route = useRoute();
      console.log('Route:', route);
      this.detailProduct = route.params.id
      // console.log(this.detailProduct);
      this.findProduct = JSON.parse(localStorage.getItem('data')).find((product)=> product.title === this.detailProduct)
    }
    
  }
});