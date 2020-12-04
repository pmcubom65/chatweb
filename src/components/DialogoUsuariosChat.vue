<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialogousuarios" width="700px">
      <v-card>
        <v-app-bar dark color="primary">
          <v-toolbar-title>Seleccione Usuarios a Añadir a Mis Contactos</v-toolbar-title>

          <v-spacer></v-spacer>
        </v-app-bar>

        <v-card-text>
          <v-list shaped v-for="item in usuarios" v-bind:key="item.id">
            <v-list-item>
              <v-list-item-icon>
                 
               <v-icon size="25"> mdi-account-circle</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title class="font-weight-black">{{ item.NOMBRE }}</v-list-item-title>
                <v-list-item-subtitle>{{ item.EMAIL }}</v-list-item-subtitle>

                <v-list-item-subtitle class="novisible red--text font-weight-bold" :id="seleccionado(item.EMAIL)">{{respuestadd}}</v-list-item-subtitle>

               <v-btn
            elevation="2" @click="contactoanadido(item)" :id="botonseleccionado(item.EMAIL)" 
                >Añadir a Contactos</v-btn>

              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" text @click.native="close">Cerrar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>



<script>
import axios from "axios";



export default {
  name: "DialogoUsuariosChat",

 mounted() {
       this.$bus.$on("dialousuarioschat", (parametros, parametros2) => {

      this.usuarios = parametros;

      this.idprop=parametros2.ID;

    });
      



  },
  methods: {
      seleccionado: function(ID) {
          return 'seleccionado'+ID;
      },


      botonseleccionado: function(ID){
          return 'botonseleccionado'+ID;
      },




    close: function () {
      this.respuestadd='';
      this.$emit("update:dialogousuarios", false);
    },
    contactoanadido: function(item){
            axios
      .post("https://sdi2.smartlabs.es:30002/api/smartchat/anadiramigo", {

          emailamigo: item.EMAIL,
           idpropietario: this.idprop


      })
      .then((response)=> {

        this.usuarioschat=response.data.MIEMBROS;
        var elementoseleccionado = "seleccionado" + item.EMAIL;
        var botonseleccionado='botonseleccionado'+item.EMAIL;

        console.log(response);
        document.getElementById(botonseleccionado).style.display = 'none';
        document.getElementById(elementoseleccionado).style.display = 'block';


        if (response.data.codigo==2){

            this.respuestadd='El usuario no se ha dado de alta en la aplicación. Usuario no añadido a contactos';

        }else {
         
          this.respuestadd='Contacto añadido con éxito';

          this.$bus.$emit("actualizarstepper");


        }
    
      })
      .catch(function (error) {
        console.log(error);
      });


    }
  },

  props: {
    dialogousuarios: {
      default: false,
    },
  },

  data() {
    return {
      usuarios: [],
      idprop: '',
      respuestadd: ''
    };
  },
};
</script>



<style scoped>
.v-btn--text {
  font-size: 15pt !important;
}
.novisible {
    display: none;
}


</style>

