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
        text
      >
        <span class="mr-2">Iniciar Autenticación</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>



      <v-navigation-drawer
      v-model="drawer"
      absolute
       width="20%"
       :src="require('@/assets/fondorojonegro.jpg')"
      temporary
      
    >

      <v-list-item>
        <v-list-item-avatar>
          <v-img :src="fotousuario"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title class="white--text">{{miusuario.NOMBRE}}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider  class="white--text"></v-divider>

      <v-list dense>
        <v-list-item @click="menuActionClick(item.action)"
          v-for="item in items"
          :key="item.title"
          link
        >
          <v-list-item-icon>
            <v-icon  class="white--text">{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title  class="white--text">{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

 
         <dialogo-usuarios-chat :dialogousuarios.sync="dialogu"></dialogo-usuarios-chat>

         <dialogo-amigos :dialogoamigos.sync="dialogoamigo"></dialogo-amigos>
                 <mi-dialogo :dialog.sync="dialogofoto"></mi-dialogo>

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

import DialogoUsuariosChat from './components/DialogoUsuariosChat.vue';
import DialogoAmigos from './components/DialogoAmigos.vue';
import MiDialogo from './components/MIDialogo';
import axios from "axios";

export default {

  name: 'App',
  components: { Mifooter, DialogoUsuariosChat, DialogoUsuariosChat, DialogoAmigos, MiDialogo },


  mounted() {

    this.$bus.$on("menunavegacion", (data) => {
  

        this.estalogado=false;
        this.miusuario=data;

    });


    this.$bus.$on("fotousuario", (data) => {
      this.fotousuario = data.replace("//", "/");
  
    });


      axios
      .post("http://localhost:54119/api/smartchat/buscarcontactosweb", {})
      .then((response)=> {

                     
        this.usuarioschat=response.data.MIEMBROS;
      })
      .catch(function (error) {
        console.log(error);
      });


  },


  data() {
  return {
    logo: require('@/assets/logo.png'),
    estalogado : true,
      drawer: null,
      miusuario: {},
      fotousuario: '',
      dialousuarioschat: false,
      dialogoamigo: false,
      dialogofoto: false,
      usuarioschat: [],
      dialogu: false,
        items: [
          { title: 'Inicio', icon: 'mdi-view-dashboard', action: "inicio" },
           { title: 'Subir Foto de Perfil', icon: 'mdi-clippy' , action: "subirfoto"},
          { title: 'Mis Contactos', icon: 'mdi-forum' , action: "miscontactos"},
          { title: 'Buscar Contactos', icon: 'mdi-account-check' , action: "buscarcontactos"},
          { title: 'Crear Grupo', icon: 'mdi-account-multiple-plus' , action: "creargrupo"},
         { title: 'Añadir usuario a un grupo', icon: 'mdi-account-multiple-plus' , action: "anadirusuariogrupo"},
        ],
  }
},

methods: {
 menuActionClick : function(accion) {

    switch (accion) {

      case "inicio":
           console.log("inicio");
        break;

      case "subirfoto":

      this.dialogofoto = true;

      var parametros = {
        chatid: '',
        idusuariorecepcion: '',
      };

      this.$bus.$emit("dialog", parametros);

        break;

      case "miscontactos":
         console.log("miscontactos");
         this.dialogoamigo=true;
 
        break;

       case "buscarcontactos":
       
            this.dialogu = true;
            this.$bus.$emit("dialousuarioschat", this.usuarioschat, this.miusuario);
 
        break;

        case "creargrupo":
           console.log("creargrupo");
        break;
    }


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


 .v-list-item__title {
  font-size: 1.3em !important;
  padding: 0.5rem;
 
}

.v-list-item__content:hover {
  background-color: red;
}


.v-list-item__icon {
  font-size: 1.3em;
  padding: 0.5rem;
 
}


</style>