<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialogoamigos" width="900px">
      <v-card>
        <v-app-bar dark color="primary">
          <v-toolbar-title>Lista de Contactos</v-toolbar-title>

          <v-spacer></v-spacer>
        </v-app-bar>

        <v-card-text>
            <v-layout justify-center>
   <v-row no-gutters>
              <v-card
              width="344"
              class="mx-auto"
              v-for="item in contactosamigos" v-bind:key="item.id"
              >


            <v-list-item>
            <v-list-item-avatar color="grey"></v-list-item-avatar>
                        <v-badge
                          v-if="item.MENSAJESSINLEER > 0"
                          color="green"
                          :content="item.MENSAJESSINLEER"
                        >
                        
                        </v-badge>
                 

              <v-list-item-content>

                   <v-list-item-title class="headline">{{item.NOMBRE}}</v-list-item-title>
                   <v-list-item-subtitle>{{item.EMAIL}}</v-list-item-subtitle>
           

  
              </v-list-item-content>
            </v-list-item>
        

              </v-card>

   </v-row>
            </v-layout>
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

 mounted() {
       this.$bus.$on("dialogoamigo", (parametros, parametros2) => {

         console.log("dialogoamigo "+parametros)

      this.contactosamigos = parametros;

  

    });
 },

  methods: {
       close: function () {
      this.$emit("update:dialogoamigos", false);
    },

  },


  props: {
    dialogoamigos: {
      default: false,
    },
  },
  data() {
    return {
      contactosamigos: [],
      idprop: ''
    };
  },

}
</script>


<style scoped>
.v-card .v-sheet {
  margin-top: 1.5rem;

}
</style>