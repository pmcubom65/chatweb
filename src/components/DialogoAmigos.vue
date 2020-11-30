<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialogoamigos" width="700px">
      <v-card>
        <v-app-bar dark color="primary">
          <v-toolbar-title>Lista de Contactos</v-toolbar-title>

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
                <v-list-item-subtitle> </v-list-item-subtitle>

            

               <v-btn
            elevation="2"
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
  name: "DialogoAmigos",
  props: {
    dialogoamigos: {
      default: false,
    },
  },
  data() {
    return {
      usuarios: [],
      idprop: ''
    };
  },

}
</script>