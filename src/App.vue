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

      <div id="cabeceradrawer">
        <div>
        <v-list-item-avatar>
          <v-img :src="fotousuario"></v-img>
        </v-list-item-avatar>
        </div>

        <div id="bajar">
          <div class="white--text">{{miusuario.NOMBRE}}</div>
        </div>
      </div>

      <v-divider  class="white--text"></v-divider>

      <v-list dense>
        <v-list-item @click="menuActionClick(item.action)" 
          v-for="item in items"
          :key="item.title"
          link
        >


          <v-list-item-content>
            <div class="box">
                      <v-list-item-icon>
            <v-icon  class="white--text">{{ item.icon }}</v-icon>
          </v-list-item-icon>
            <v-list-item-title  class="white--text">{{ item.title }}</v-list-item-title>
            </div>
          </v-list-item-content>
        </v-list-item>
      </v-list>

 
         <dialogo-usuarios-chat :dialogousuarios.sync="dialogu"></dialogo-usuarios-chat>

          <dialogo-crear-grupo :dialogogrupo.sync="dialogg"></dialogo-crear-grupo>

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
import DialogoCrearGrupo from './components/DialogoCrearGrupo'
import axios from "axios";


export default {

  name: 'App',
  components: { Mifooter, DialogoUsuariosChat, DialogoUsuariosChat, DialogoAmigos, MiDialogo,  DialogoCrearGrupo, DialogoCrearGrupo},


  mounted() {

    this.$bus.$on("menunavegacion", (data) => {
  

        this.estalogado=false;
        this.miusuario=data;


                    axios
        .post("https://sdi2.smartlabs.es:30002/api/smartchat/misgrupos", {
          telefono: data.TELEFONO,
        })
        .then((response) => {
          this.grupos = response.data.GRUPOS;


        })
        .catch(function (error) {
          console.log(error);
        });

    });


    this.$bus.$on("fotousuario", (data) => {
      this.fotousuario = data.replace("//", "/");
  
    });


      axios
      .post("https://sdi2.smartlabs.es:30002/api/smartchat/buscarcontactosweb", {})
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
      dialogg: false,
      usuarioschat: [],
      grupos: [],
      dialogu: false,
        items: [
          { title: 'Inicio', icon: 'mdi-view-dashboard', action: "inicio" },
           { title: 'Subir Foto de Perfil', icon: 'mdi-clippy' , action: "subirfoto"},
          { title: 'Mis Contactos', icon: 'mdi-forum' , action: "miscontactos"},
          { title: 'Buscar Contactos', icon: 'mdi-account-check' , action: "buscarcontactos"},
          { title: 'Crear Grupo', icon: 'mdi-account-multiple-plus' , action: "creargrupo"},
         { title: 'Unir usuario a un grupo', icon: 'mdi-account-multiple-plus' , action: "anadirusuariogrupo"},
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
           this.dialogg=true;

        break;

        case "anadirusuariogrupo":
           console.log("anadirusuariogrupo");
            this.dialogoamigo=true;

            this.$bus.$emit("dialogoanadirusuarioagrupo", this.grupos);

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

.v-list-item {
  padding-left: 0px !important;
  padding-right: 0px !important;
}


 .v-list-item__title {
  font-size: 1.3em !important;
  padding: 0.5rem;
 
}

.v-list-item__content:hover {
  background-color: red;
  
}



#cabeceradrawer {
  height: 15vh;
  display: flex;
  margin-top: 4rem;
  margin-left: 2rem;
  font-size: 1.4rem !important;
}


.v-list-item__icon {
  font-size: 1.3em;
  padding: 0.5rem;
 
}

    .box {
            display: flex;
          }


          #bajar {
            margin-top: 0.5rem;
          }


</style>