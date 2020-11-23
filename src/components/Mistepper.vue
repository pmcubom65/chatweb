
<template>
  <v-stepper v-model="e1">
    <v-stepper-header>
      <v-stepper-step :complete="e1 > 1" step="1">
        <h2 v-if="chatogrupo">Seleccione Chat</h2>
        <h2 v-else>Seleccione Grupo</h2>
      </v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step :complete="e1 > 2" step="2"
        ><h2>Chat</h2>
      </v-stepper-step>

      <v-divider></v-divider>
    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content step="1">
        <v-card class="mb-12" color="red lighten-5">
          <v-layout justify-center v-if="chatogrupo">
            <v-container
              v-for="item in chats"
              v-bind:key="item.id"
              class="grey lighten-5 mb-6"
            >
              <v-row no-gutters>
                <v-card
                  max-width="344"
                  outlined
                  class="pa-2 lastarjetaschats"
                  :id="tarjetaid(item.CODIGO)"
                >
                  <v-list-item three-line>
                    <v-list-item-content>
                      <div class="overline mb-4">
                        Inicio {{ item.INICIO.replace("T", " ") }}
                      </div>
                      <v-list-item-title class="headline mb-1">
                        {{ item.NOMBRE }}
                      </v-list-item-title>
                      <v-list-item-subtitle
                        >Telefono {{ item.TELEFONO }}</v-list-item-subtitle
                      >
                    </v-list-item-content>

                    <img
                      height="80px"
                      v-if="item.RUTA.length > 0"
                      :src="construirRuta(item.RUTA)"
                    />

                    <img
                      height="80px"
                      v-else
                      src="https://picsum.photos/id/1/200/300"
                    />
                  </v-list-item>

                  <v-card-actions>
                    <v-btn
                      outlined
                      rounded
                      text
                      color="primary"
                      @click="seleccionado(item, chats)"
                      >SELECCIONAR</v-btn
                    >
                  </v-card-actions>
                </v-card>
              </v-row>
            </v-container>
          </v-layout>

          <v-layout justify-center v-else>
            <v-container
              v-for="item in grupos"
              v-bind:key="item.id"
              class="grey lighten-5 mb-6"
            >
              <v-row no-gutters>
                <v-card
                  min-width="344"
                  outlined
                  class="pa-2 lastarjetaschats"
                  :id="tarjetaid(item.ID)"
                >
                  <v-list-item three-line>
                    <v-list-item-content>
                      <div class="overline mb-4">
                        <v-badge
                          v-if="item.MENSAJESSINLEER > 0"
                          color="green"
                          :content="item.MENSAJESSINLEER"
                        >
                        <v-icon>mdi-account-multiple-outline</v-icon>
                        </v-badge>
                      </div>
                      <v-list-item-title class="headline mb-1">
                        {{ item.NOMBRE }}
                      </v-list-item-title>
                    </v-list-item-content>

                    <img
                      height="80px"
                      src="https://i.picsum.photos/id/160/3200/2119.jpg?hmac=cz68HnnDt3XttIwIFu5ymcvkCp-YbkEBAM-Zgq-4DHE"
                    />
                  </v-list-item>

                  <v-card-actions>
                    <v-btn
                      outlined
                      rounded
                      text
                      color="primary"
                      @click="seleccionado(item, chats)"
                      >SELECCIONAR</v-btn
                    >


                         <v-btn
                      outlined
                      rounded
                      text
                      color="primary"
                      @click="seleccionado(item, chats)"
                      >MIEMBROS</v-btn
                    >
                  </v-card-actions>
                </v-card>
              </v-row>
            </v-container>
          </v-layout>
        </v-card>

        <v-btn
          color="primary"
          :disabled="chatseleccionado == null"
          @click="iniciarChat()"
        >
          Iniciar
        </v-btn>

        <v-btn :disabled="e1 == 1" text> Volver </v-btn>
      </v-stepper-content>

      <v-stepper-content step="2">
        <v-card class="mb-12 pb-12 pt-12 pl-12 pr-12" color="red lighten-5">
          <div
            v-for="item in mensajes"
            v-bind:key="item.id"
            class="d-flex mensajecontainer"
          >
            <div>
              <mensaje
                :mensaje="item"
                :chat="chatseleccionado"
                :color="cambiarcolor(item.TELEFONO)"
              ></mensaje>
            </div>
          </div>

          <div class="d-flex">
            <div>
              <v-text-field
                v-model="mensajeescrito"
                label="Enviar Mensaje"
              ></v-text-field>
            </div>

            <div>
              <v-btn
                class="mx-2"
                fab
                dark
                large
                color="red"
                @click="mandarMensaje"
              >
                <v-icon dark> mdi-pencil </v-icon>
              </v-btn>
            </div>

            <div>
              <v-btn class="mx-2" fab dark large color="red">
                <v-icon dark> mdi-upload </v-icon>
              </v-btn>
            </div>
          </div>
        </v-card>

        <v-btn text @click="volveratras"> Volver </v-btn>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>


<script>
import axios from "axios";
import Mensaje from "./Mensaje.vue";
import { bus } from "../main";

export default {
  name: "Mistepper",
  components: { Mensaje },

  mounted() {
    if (this.$props.tipo) {
      axios
        .post("http://localhost:54119/api/smartchat/detallesmischats", {
          telefono: this.$route.params.id.split("&&")[0],
        })
        .then((response) => {
          this.chats = response.data.chats;
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      axios
        .post("http://localhost:54119/api/smartchat/misgrupos", {
          telefono: this.$route.params.id.split("&&")[0],
        })
        .then((response) => {
          this.grupos = response.data.GRUPOS;
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  },

  created() {
    bus.$on("fotousuario", (data) => {
      console.log("foto del usuario " + data);
      this.foto = data;
    });
  },

  methods: {
    tarjetaid: function (CODIGO) {
      return "tarjeta" + CODIGO;
    },

    cambiarcolor: function (telefono) {
      if (telefono === this.$route.params.id.split("&&")[0]) {
        return "#301934";
      } else {
        return "#152238";
      }
    },

    volveratras: function () {
      this.chatseleccionado = null;
      this.e1 = 1;
    },

    seleccionado: function (item, lista) {
      var buscarel = "tarjeta" + item.CODIGO;
      document.getElementById(buscarel).style.backgroundColor = "#FA8072";

      for (var i = 0; i < lista.length; i++) {
        var quitar = "tarjeta" + lista[i].CODIGO;

        if (!(quitar === buscarel)) {
          console.log(quitar);
          console.log(buscarel);
          document.getElementById(quitar).style.backgroundColor = "#FFFFFF";
        }
      }

      this.chatseleccionado = item;
    },

    construirRuta: function (ruta) {
      return (
        "https://smartchat.smartlabs.es/" +
        ruta
          .replace(/\\/g, "/")
          .replace("//", "")
          .replace("SRVWEB-01/inetpub/wwwroot/SmartChat", "")
          .replace("//", "/")
      );
    },

    iniciarChat: function () {
      if (this.chatseleccionado != null) {
        var buscarel = "tarjeta" + this.chatseleccionado.CODIGO;
        document.getElementById(buscarel).style.backgroundColor = "#FFFFFF";

        this.e1 = 2;

        axios
          .post("http://localhost:54119/api/smartchat/buscarmensajeschat", {
            codigo: this.chatseleccionado.CODIGO,
          })
          .then((response) => {
            this.mensajes = response.data.mensajes;
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    },

    mandarMensaje: function () {
      this.e1 = 2;

      if (this.mensajeescrito.length > 0) {
        var tzoffset = new Date().getTimezoneOffset() * 60000;
        var m = new Date()
          .toISOString()
          .slice(0, 19)
          .replace(/-/g, "/")
          .replace("T", " ");

        axios
          .post("http://localhost:54119/api/smartchat/crearmensaje", {
            contenido: this.mensajeescrito,
            usuarioid: this.$route.params.id.split("&&")[0],
            chatid: this.chatseleccionado.CODIGO,
            dia: m,
            idusuariorecepcion: this.chatseleccionado.TELEFONO,
          })
          .then((response) => {
            console.log(response.data.mensajes);
            this.mensajeescrito = "";

            this.iniciarChat();

            this.mandarnotificacion();
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    },

    mandarnotificacion: function () {
      var jdata = {
        michatid: this.chatseleccionado.CODIGO,
        titulo: this.mensajeescrito,
        fotoreceptor: this.chatseleccionado.RUTA,

        fotoemisor: this.foto,

        tokenaenviar: this.chatseleccionado.TOKEN,
        tokenemisor: this.$route.params.id.split("&&")[3],
        nombreemisor: this.$route.params.id.split("&&")[1],
        nombrereceptor: this.chatseleccionado.NOMBRE,
        telefonoemisor: this.$route.params.id.split("&&")[0],
        telefonoreceptor: this.chatseleccionado.TELEFONO,

        esgrupo: false,
      };

      axios
        .post(
          "https://fcm.googleapis.com/fcm/send",
          {
            to: this.chatseleccionado.TOKEN,
            priority: "high",
            data: jdata,
          },
          {
            headers: {
              "content-type": "application/json",
              authorization:
                "key=AAAAafa8PTg:APA91bEafAQa2vygzlPALqd72Dik0BflDS7b-hCraAwZvzAkK-hLHsohWvsN1C5kHSSym3pdZx5M63COhYBPosP7Icu-JDXguENKkH3fvXco4CXroInSeLadlujJKpUrqoROt1ttGiW0",
            },
          }
        )
        .then((response) => {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },

  props: {
    tipo: {
      type: Boolean,
    },
  },

  data() {
    return {
      e1: 1,
      chatogrupo: this.$props.tipo,
      chats: [],
      grupos: [],
      mensajes: [],
      chatseleccionado: null,

      mensajeescrito: "",

      foto: "",
    };
  },
};
</script>


<style scoped>
.mensajecontainer {
  margin-bottom: 20px;
}

.red {
  background-color: #ffffff;
}

.v-text-field {
  width: 1400px;
}
</style>