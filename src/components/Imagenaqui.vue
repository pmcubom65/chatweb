<template>
        <div class="image-cropper">

               <img :src="urlimagen" class="rounded">

    </div>



</template>



<script>


export default {
  name: "Imagenaqui",

props: {
    laurl: {
      default: '',
      required: false
    }
  },

  data() {
      return {
        urlimagen: this.$props.laurl
      }
  }
}


</script>