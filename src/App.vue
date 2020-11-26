<template>

  <v-app>
    <v-app-bar
      app
      color="primary"
      fixed
      dark
    >
      <div class="d-flex align-center">

        <v-btn icon @click.stop="drawer = !drawer">

        <v-icon>mdi-apps</v-icon>
        </v-btn>


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
      temporary
    >
      <v-list-item>
        <v-list-item-avatar>
          <v-img src="https://randomuser.me/api/portraits/men/78.jpg"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>John Leider</v-list-item-title>
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





  data() {
  return {
    logo: require('@/assets/logo.png'),
      drawer: null,
        items: [
          { title: 'Home', icon: 'mdi-view-dashboard', action: "test" },
          { title: 'About', icon: 'mdi-forum' , action: "logout"},
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

<style>

</style>