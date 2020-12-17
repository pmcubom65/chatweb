<template>
  <v-layout row justify-center>
    <v-dialog v-model="mas" width="100vw"  :fullscreen="$vuetify.breakpoint.xsOnly">
      <v-card>
        <v-app-bar dark color="primary">
          <v-toolbar-title>Todos los mensajes</v-toolbar-title>

          <v-spacer></v-spacer>
        </v-app-bar>

        <v-card-text class="d-flex flex-row mb-6  flex-wrap">
          <v-list
            three-line
            v-for="item in total"
            v-bind:key="item.id"
          >
    
            <v-list-item>
              <mensaje
                :mensaje="item"
                :mostrarirchat="false" :coniconos="false"
              ></mensaje>

 
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
import Mensaje from "./Mensaje";
export default {
  name: "DialogoMas",
  components: { Mensaje },

  mounted() {
    this.$bus.$on('todoslosmensajes', (data) => {
      this.total = data;
    });


  },

  props: {
    mas: {
      default: false,
    },
    chat: ''
  },

  data() {
    return {
      total: []
    };
  },
  methods: {


    close: function () {
      this.$emit("update:mas", false);
    },

    marcarcomoleidosusuario: function () {
      axios
        .post(
          "https://sdi2.smartlabs.es:30002/api/smartchat/ponercomoleidosusuario",
          {
            idpropietario: this.$route.params.id.split("&&")[2],
          }
        )
        .then((response) => {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });

      this.$emit("update:noleidos", false);
    },


  },
};
</script>