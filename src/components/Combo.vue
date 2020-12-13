<template>
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
</template>

<script>
import Router from "../router";
export default {
  name: "combo",
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
    };
  },

  methods: {
    logout: function (e) {
      console.log(e)
      if (this.milogout.nombre == "Logout") {
        this.$store.dispatch("getUsuario", null);

        window.localStorage.removeItem("currentusersmartchat");
        this.$bus.$emit("hayusuariograbado", false);
        Router.push({
          path: "/",
        });
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