import { defineStore } from 'pinia';

export const useFilterStore = defineStore({
  id: 'maps',
  state: () => ({
    detailProduct: null,
    findProduct: null,
    relatedProduct: null,


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
    },

    relatedData(){
      this.relatedProduct = JSON.parse(localStorage.getItem('data')).filter((item)=> item.type === this.findProduct?.type)
      this.relatedProduct = this.relatedProduct.sort(()=> Math.random() - 0.5).slice(0,4)
    }
    
  }
});