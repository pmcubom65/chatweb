<template>
  <div :class="{mostrar: mostrarsi}">
    <v-img height="500" width="500" :src="crearqr"
    lazy-src="https://picsum.photos/id/11/100/60">


      
    </v-img>
  </div>
</template>


<script>
export default {
  name: "Autenticacionqr",


  mounted() {
    this.$bus.$on("realizarscroll", () => {

        this.buscarqr=true;
        this.mostrarsi=false;

    });
  },


    data() {
         return {
    
             buscarqr: false,
             mostrarsi: true

         }   
    },

  computed: {
    crearqr: function () {

        if (this.buscarqr){

      const start = Date.now();

      var paleatoria = start + this.hacerp(10);

      console.log(paleatoria);

      return `https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${paleatoria}`;

        }


    },
  },

  methods: {
    hacerp: function (longitud) {
      var result = "";

      var characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      var charactersLength = characters.length;
      for (var i = 0; i < longitud; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }

      return result;
    },
  },
};
</script>

<style scoped>
div.v-image {
  display: block;
  margin: auto;
}


.mostrar {
    display: none;
}
</style>