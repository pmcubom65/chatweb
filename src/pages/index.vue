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



<v-layout row wrap>
  <v-flex xs12 sm12>
 <v-parallax
    height="500"
 
    src="https://i.picsum.photos/id/209/1920/1280.jpg?hmac=VkEKEKhTEKOSFL4n-N4aLnbGGpV5hxuCs2tx_ny4y5g"
  ><h1 class="display-4 font-weight-black text-right titulo" justify="end">Tus chats en Smartlabs</h1></v-parallax>

  </v-flex>
</v-layout>
</div>
</template>





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

.paralelo {
  width: 100%;
  margin: 0px;
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

h1.titulo {
  color: red;
}
</style>
