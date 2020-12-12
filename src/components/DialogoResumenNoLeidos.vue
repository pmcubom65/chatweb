<template>
  <v-layout row justify-center>
    <v-dialog v-model="noleidos" width="100vw">
      <v-card>
        <v-app-bar dark color="primary">
          <v-toolbar-title>Resumen Mensajes No Leidos</v-toolbar-title>

          <v-spacer></v-spacer>
        </v-app-bar>

        <v-card-text v-if="nl != null" class="d-flex flex-row mb-6">
          <v-list
            three-line
            v-for="item in nl.mensajesnoleidos"
            v-bind:key="item.id"
          >
            <v-list-item>
              <mensaje
                :mensaje="item"
                :mostrarirchat="item.AMIGO.length != 4" :coniconos="true"
              ></mensaje>

 
            </v-list-item>
          </v-list>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" text @click.native="close">Cerrar</v-btn>
          <v-btn color="purple" @click.native="marcarcomoleidosusuario" text
            >Marcar Como Leidos</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>


<script>
import axios from "axios";
import Mensaje from "./Mensaje";
export default {
  name: "DialogoResumenNoLeidos",
  components: { Mensaje },

  mounted() {
    this.$bus.$on("mismensajesnoleidos", (data) => {
      this.nl = data;
    });

    this.$bus.$on("cierrate", (datoschat, otro) => {
      this.close();
    });
  },

  props: {
    noleidos: {
      default: false,
    },

    idpropietario: {
      required: false,
    },
  },

  data() {
    return {
      nl: null,
      respuestadd: "",
    };
  },
  methods: {


    close: function () {
      this.$emit("update:noleidos", false);
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

<style scoped>
.novisible {
  display: none;
}

.v-btn--text {
  font-size: 15pt !important;
}
</style>