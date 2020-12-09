<template>
  <v-select
    :items="items"
    v-model="milogout"
    :label="dameusuario.NOMBRE"
    filled
    background-color="#545454"
    @change="logout"
  ></v-select>
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
      items: ["Ir a mi consola", "Logout"],
      select: "",
    };
  },

  methods: {
    logout: function () {
      if (this.milogout == "Logout") {
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
           this.milogout = '';
      }

    
    },
  },
};
</script>