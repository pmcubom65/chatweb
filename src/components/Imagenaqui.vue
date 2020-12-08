<template>
        <div class="image-cropper" >


            <v-img
  
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

.image-cropper {
    width: 100px;
    height: 100px;
    position: relative;
    overflow: hidden;
    border-radius: 50%;
    margin-right: 5rem;
}
</style>