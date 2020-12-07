<template>
        <div class="image-cropper" >


            <v-img
  lazy-src="https://picsum.photos/id/11/10/6"
  max-height="150"
  max-width="250"
  :src="miusuario.RUTA"
  class="rounded"
></v-img>

    

    </div>



</template>



<script>
export default {
  name: "Imagenaqui",

  computed: {

    miusuario(){
      return this.$store.state.usuario;
    }

  },




}
</script>

<style scoped>
img.rounded {
  object-fit: cover;
  border-radius: 50%;
  height: 100px;
  width: 100px;


}
</style>