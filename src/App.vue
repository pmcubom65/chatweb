<template>

  <v-app>
    <v-app-bar
      app
      color="primary"
      fixed
      dark
    >
      <div class="d-flex align-center">

        <div v-bind:class="{ 'midisplay': estalogado }">

        <v-btn icon @click.stop="drawer = !drawer">

        <v-icon>mdi-apps</v-icon>
        </v-btn>

        </div>


      <router-link to="/">
        <v-img
          alt="Logo"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="200"
          :src="logo"
          width="200"
        />
        </router-link>
      </div>

      <v-spacer></v-spacer>

      <v-btn
         @click="miscroll"
      ><span class="mr-2">Código qr</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>

      <v-btn
        to="/autenticacion"
        target="_blank"
        text
      >
        <span class="mr-2">Iniciar Autenticación</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>



      <v-navigation-drawer
      v-model="drawer"
      absolute
       width="30%"
      temporary
    >

      <v-list-item>
        <v-list-item-avatar>
          <v-img :src="fotousuario"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>{{miusuario.NOMBRE}}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item @click="menuActionClick(item.action)"
          v-for="item in items"
          :key="item.title"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

    </v-navigation-drawer>





    <v-main >
      <router-view></router-view>
  <Mifooter :milogo="logo"></Mifooter>

    </v-main>
  </v-app>

</template>

<script>

import Mifooter from './components/Mifooter.vue';
import Router from './router';


export default {

  name: 'App',
  components: { Mifooter },


  mounted() {

    this.$bus.$on("menunavegacion", (data) => {
  

        this.estalogado=false;
        this.miusuario=data;

    });


    this.$bus.$on("fotousuario", (data) => {
      this.fotousuario = data.replace("//", "/");
  
    });


  },


  data() {
  return {
    logo: require('@/assets/logo.png'),
    estalogado : true,
      drawer: null,
      miusuario: {},
      fotousuario: '',
        items: [
          { title: 'Inicio', icon: 'mdi-view-dashboard', action: "test" },
          { title: 'Mis Contactos', icon: 'mdi-forum' , action: "contactos"},
          { title: 'Añadir Contactos', icon: 'mdi-account-check' , action: "Acontactos"},
          { title: 'Crear Grupo', icon: 'mdi-account-multiple-plus' , action: "cgrupo"},
        ],
  }
},

methods: {
 menuActionClick : function(accion) {
    console.log(accion);
  },

    logout : function() {
    console.log(accion);
  },

  miscroll : function() {

    this.$bus.$emit("realizarscroll");
  }


}
};
</script>

<style scoped>
.midisplay {
  display: none;
}
</style>