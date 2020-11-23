<template>
<div>

<div class="presentacion" :style="{ backgroundImage: 'url(' + require('@/assets/landing.svg') + ')' }">

  
        <v-img
          alt="logo"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="600"
          :src="logo"
          width="600"
        />

</div>
<div class="paralelo">
 <v-parallax
    height="500"
    
    src="https://i.picsum.photos/id/1015/6000/4000.jpg?hmac=aHjb0fRa1t14DTIEBcoC12c5rAXOSwnVlaA5ujxPQ0I"
  ></v-parallax>

</div>

</div>
</template>

<style scoped>

.paralelo {
  width: 100%;
}


.presentacion {

  display: flex;
  justify-content: center;
  height: 100vh;
   width:60%; 
   margin: auto;

   padding-top: 250px;
   padding-right: 70px;

}

</style>



<script>
  export default {
     data() {
  return {
        logo: require('@/assets/logo.png'),
    miimagen: require('@/assets/landing.svg'),
      
  }
},
  }
</script>


<style scoped>



img {
  display:block;
    margin:auto;

}
</style>
