<template>
  <div>
    <div class="box">
      <div id="espacio"></div>
      <div
        class="presentacion"
        :style="{
          backgroundImage: 'url(' + require('@/assets/landing.svg') + ')',
        }"
      >
        <v-img
          alt="logo"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="550"
          :src="logo"
          width="550"
        />
      </div>

   
    </div>


         <v-img
        
          alt="logo"
          class="smallp"
          contain
          min-width="550"
          :src="logo"
          width="550"
        />

    <div id="dibujoqr">
      <autenticacionqr></autenticacionqr>
    </div>
  </div>
</template>





<script>
import Autenticacionqr from "../components/Autenticacionqr.vue";

export default {
  components: { Autenticacionqr },


  mounted() {
    this.$bus.$on("realizarscroll", () => {
        window.scroll({
        top: 800, 
        left: 0, 
        behavior: 'smooth'
      });


    });
  },

  data() {
    return {
      logo: require("@/assets/logo.png"),
      miimagen: require("@/assets/landing.svg"),
    };
  },
};
</script>


<style scoped>
.box {
  display: flex;
  flex-direction: row;
}

#espacio {
  width: 350px;
}

img {
  display: block;
  margin: auto;
}

.paralelo {
  width: 100%;
  margin: 0px;
}

.presentacion {
  margin-top: 0px;

  display: flex;
  justify-content: center;
  height: 100vh;
  width: 60%;
  margin: auto;

  padding-top: 100px;
  padding-right: 230px;
}



@media screen and (max-width: 1500px) {
  .presentacion, .espacio {

    display: none;
  }

}

.smallp {
  margin: 0 auto;
  padding-top: 200px;
}

@media screen and (min-width: 1500px) {

  .smallp{
  display: none;

  }
 

}

h1.titulo {
  color: red;
}
</style>
