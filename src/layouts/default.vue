<template>

  <div class="mitext">
   

    <router-view/>

  </div>
</template>

<script>
import Router from '../router'
export default {
  
  mounted() {

  if (window.localStorage.getItem("currentusersmartchat") != null) {
    let elusuario=JSON.parse(window.localStorage.currentusersmartchat)
    this.$store.dispatch("getUsuario", elusuario);

    this.$store.dispatch("getAmigos", elusuario.ID);

      this.$store.dispatch("getGrupos", elusuario.TELEFONO);


    this.$bus.$emit("hayusuariograbado", true);

  
  }


}
}
</script>




<style>

.mitext {
  background-color: #ffe5ea;


  padding: 50px;
  padding-top: 0px;
}


@media only screen and (max-width: 770px) {

.mitext {

padding-left: 0px !important;
padding-right: 0px !important;
}

}


.theme--light.v-application {
  background-color: #ffe5ea !important;
}

.v-application--wrap, .v-main, .v-application--is-ltr {
  height: 100vh !important;

}


</style>