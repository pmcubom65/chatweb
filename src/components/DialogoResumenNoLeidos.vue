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
                :mostrarirchat="item.AMIGO.length != 4"
              ></mensaje>
  {{item}}
              <div v-if="item.AMIGO.length === 4">
                <v-tooltip top>
                  <template v-slot:activator="{ on, attrs }">
                    <v-chip
                      class="ma-2"
                      color="primary"
                      outlined
                      pill
                      @click="contactoanadido(item)"
                      :id="botonseleccionadomodal(item.EMAIL)"
                      v-bind="attrs"
                      v-on="on"
                    >
                      <v-icon left> mdi-account-check </v-icon>Añadir
                    </v-chip>
                  </template>
                  <span
                    >Este usuario no pertenece a sus contactos. Añadálo para
                    conversar con él</span
                  >
                </v-tooltip>
              </div>

              <div v-if="parseInt(item.AMIGO) > 4">
                <h6
                  class="novisible red--text font-weight-bold"
                  :id="exitomodalcontacto(item.EMAIL)"
                >
                  Añadido a contactos
                </h6>
              </div>
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
    botonseleccionadomodal: function (valor) {
      return "exitoseleccionadomodal" + valor;
    },

    exitomodalcontacto: function (valor) {
      return "botonseleccionadomodal" + valor;
    },

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

    contactoanadido: function (item) {
      axios
        .post("https://sdi2.smartlabs.es:30002/api/smartchat/anadiramigo", {
          emailamigo: item.EMAIL,
          idpropietario: this.$props.idpropietario,
        })
        .then((response) => {
          console.log(response);

          this.usuarioschat = response.data.MIEMBROS;
          var elementoseleccionado = "exitoseleccionadomodal" + item.EMAIL;
          var botonseleccionado = "botonseleccionadomodal" + item.EMAIL;

          document.getElementById(botonseleccionadomodal).style.display =
            "none";
          document.getElementById(elementoseleccionado).style.display = "block";

          this.respuestadd = "Contacto añadido con éxito";

          this.$bus.$emit("actualizarstepper");
        })
        .catch(function (error) {
          console.log(error);
        });
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