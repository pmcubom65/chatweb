<template>
<div>
  <v-select
    :items="items"
    item-text="nombre"
    v-model="milogout"
    :label="dameusuario.NOMBRE"
    filled
    background-color="red"
    @change="logout"
    return-object
  >
  
  
      <template v-slot:item="{ item }">
         <v-icon
      large
      color="red darken-2"
    >
      {{item.icono}}
    </v-icon>
       <span class="font-weight-black ml-3">{{ item.nombre }}</span>
    </template>
  
  
   
  </v-select>


 <dialogo-logout :dialogologout.sync="dialogologouta"></dialogo-logout>
</div>

</template>

<script>
import Router from "../router";

import DialogoLogout from './DialogoLogout.vue';

export default {
  name: "combo",
    components: {
    
        DialogoLogout
    },
  computed: {
    dameusuario() {
      return this.$store.state.usuario;
    },
  },
  data() {
    return {
      usuariologado: "",
      milogout: null,
      items: [{nombre: "Ir a mi consola", icono: 'mdi-domain'},
      {nombre:  "Logout", icono: 'mdi-exit-to-app'}
     ],
      select: "",
      dialogologouta: false,
    };
  },

  methods: {
    logout: function (e) {
      console.log(e)
      if (this.milogout.nombre == "Logout") {
      this.dialogologouta = true;

      } else {
        console.log("ir a consola ");
        console.log(Router.currentRoute);

        if (
          !(Router.currentRoute.path.startsWith('/consola'))
        ) {
          Router.push({
            path: `consola/${this.dameusuario.TELEFONO}&&${this.dameusuario.NOMBRE}&&${this.dameusuario.ID}&&${this.dameusuario.TOKEN}`,
          });
        }
           this.milogout = e.nombre;
      }





        
      this.milogout=null;



   
    
    },
  },
};
</script>

<style scoped>
@media only screen and (max-width: 770px) {

.v-input {
  width: 200px !important;

}



}
</style>