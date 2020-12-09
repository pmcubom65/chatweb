
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
            <v-container v-if="chats.length == 0 && ver">
              <v-btn color="info" large @click="abrirdialogousuarioschat">
                <v-icon dark>mdi-comment-account</v-icon>Añadir Contactos</v-btn
              >
            </v-container>

            <v-container v-else>
              <v-row>
                <v-col
                  v-for="item in chats"
                  v-bind:key="item.id"
                  class="red lighten-5 mb-6"
                  xl="3"
                  md="12"
                >
                  <v-card
                    min-width="344"
                    min-height="250"
                    outlined
                    class="pa-2 lastarjetaschats"
                    :id="tarjetaid(item.ID)"
                  >
                    <v-list-item three-line>
                      <v-list-item-content>
                        <div class="overline mb-4">
                          Inicio: {{ item.INICIO.replace("T", " ") }}
                        </div>
                        <v-list-item-title class="headline mb-1 text-wrap">
                          {{ item.NOMBRE }}

                          <v-badge
                            v-if="item.MENSAJESSINLEER > 0"
                            color="green"
                            :content="item.MENSAJESSINLEER"
                          >
                          </v-badge>
                        </v-list-item-title>
                        <v-list-item-subtitle
                          >Email {{ item.TELEFONO }}</v-list-item-subtitle
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
                        src="https://smartchat.smartlabs.es/img2/anonimos/No_image.jpg"
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
                </v-col>
              </v-row>
            </v-container>
          </v-layout>

          <v-layout justify-center v-else>
            <v-container class="grey lighten-5 mb-6">
              <v-row>
                <v-col v-for="item in grupos" v-bind:key="item.id">
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
                        :id="tarjetaid(item.ID)"
                        @click="seleccionadogrupo(item, grupos)"
                        >SELECCIONAR</v-btn
                      >
                      <dialogo-miembros
                        :dialog.sync="dialogomiembros"
                      ></dialogo-miembros>
                      <v-btn
                        outlined
                        rounded
                        text
                        color="primary"
                        @click="abrirdialogomiembros(item.MIEMBROS)"
                        >MIEMBROS</v-btn
                      >
                    </v-card-actions>
                  </v-card>
                </v-col>
              </v-row>
            </v-container>
          </v-layout>
        </v-card>

        <v-btn
          color="primary"
          :disabled="chatseleccionado == null"
          @click="iniciarChat()"
        >
          <v-icon large color="white darken-2">
            mdi-checkbox-marked-circle
          </v-icon>

          Iniciar
        </v-btn>

        <v-btn :disabled="e1 == 1" depressed color="primary">
          <v-icon large color="white darken-2"> mdi-arrow-left-bold </v-icon
          >Volver
        </v-btn>
      </v-stepper-content>

      <v-stepper-content step="2" class="estestepper">
        <v-card class="mb-12 pb-12 pt-12 pl-12 pr-12" color="red lighten-5">
          <div
            v-for="item in mensajes"
            v-bind:key="item.id"
            class="d-flex mensajecontainer"
          >
            <div id="cajitas">
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
                id="textomensaje"
                @keyup.enter="mandarMensaje"
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
                <v-icon dark> mdi-send </v-icon>
              </v-btn>
            </div>

            <div>
              <mi-dialogo :dialog.sync="dialog"></mi-dialogo>
              <v-btn
                class="mx-2"
                fab
                dark
                large
                color="red"
                @click="abrirdialogo"
              >
                <v-icon dark> mdi-upload </v-icon>
              </v-btn>
            </div>
          </div>
        </v-card>

        <v-btn depressed color="primary" @click="volveratras">
          <v-icon large color="white darken-2"> mdi-arrow-left-bold </v-icon>

          Volver
        </v-btn>

        <dialogo-usuarios-chat
          :dialogousuarios.sync="dialogu"
        ></dialogo-usuarios-chat>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>


<script>
import axios from "axios";
import MiDialogo from "./MIDialogo";
import DialogoMiembros from "./DialogoMiembros";
import DialogoUsuariosChat from "./DialogoUsuariosChat";
import Mensaje from "./Mensaje.vue";

export default {
  name: "Mistepper",
  components: {
    Mensaje,
    MiDialogo,
    DialogoMiembros,
    DialogoUsuariosChat,
  },

  mounted() {
    if (this.$props.tipo) {
      //this.cargarAmigosStepper(this.$route.params.id.split("&&")[2]);

      this.chats = this.$store.state.amigos;
    } else {
        this.cogergrupos();
    }

    this.myVar = setInterval(() => {
      this.$store.dispatch("getAmigos", this.$route.params.id.split("&&")[2]);
      this.chats = this.$store.state.amigos;
      this.chatyacreado(this.chatactualizando);
      this.cogergrupos();
      
    }, 3000);

    this.$bus.$on("actualizarstepper", () => {
      this.$store.dispatch("getAmigos", this.$route.params.id.split("&&")[2]);
      this.chats = this.$store.state.amigos;
      //  this.cargarAmigosStepper(this.$route.params.id.split("&&")[2]);
    });
  },

  computed: {
    mifoto() {
      return this.$store.state.usuario.RUTA;
    },
  },

  watch: {},

  methods: {

    cogergrupos: function() {
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
    },





    tarjetaid: function (CODIGO) {
      return "tarjeta" + CODIGO;
    },

    abrirdialogousuarioschat: function () {
      axios
        .post("http://localhost:54119/api/smartchat/buscarcontactosweb", {})
        .then((response) => {
          this.usuarioschat = response.data.MIEMBROS;

          var miusuarioo = {
            TELEFONO: this.$route.params.id.split("&&")[0],
            NOMBRE: this.$route.params.id.split("&&")[1],
            ID: this.$route.params.id.split("&&")[2],
            TOKEN: this.$route.params.id.split("&&")[3],
          };

          this.dialogu = true;
          this.$bus.$emit("dialousuarioschat", this.usuarioschat, miusuarioo);
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    cargarAmigosStepper: function (elidusuario) {
      axios
        .post("http://localhost:54119/api/smartchat/mostraramigos", {
          idpropietario: elidusuario,
        })
        .then((response) => {
          console.log("amigos " + response.data.MIEMBROS);

          this.chats = response.data.MIEMBROS;
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    abrirdialogomiembros: function (miembros) {
      this.dialogomiembros = true;

      this.$bus.$emit("dialogomiembros", miembros);
    },

    abrirdialogo: function () {
      this.dialog = true;

      var parametros = {
        chatid:
          this.chatseleccionado.CODIGO != null
            ? this.chatseleccionado.CODIGO
            : this.chatseleccionado.ID,
        idusuariorecepcion:
          this.chatseleccionado.TELEFONO != null
            ? this.chatseleccionado.TELEFONO
            : this.chatseleccionado.MIEMBROS,
      };

      this.$bus.$emit("dialog", parametros);

      this.iniciarChat();
    },

    cambiarcolor: function (telefono) {
      if (telefono === this.$route.params.id.split("&&")[0]) {
        return "#301934";
      } else {
        return "#152238";
      }
    },

    volveratras: function () {
      this.ponercomoleidos(this.chatactualizando);
      var buscarelt = "tarjeta" + this.chatseleccionado.ID;

      document.getElementById(buscarelt).style.backgroundColor = "#FFFFFF";

      this.cargarAmigosStepper(this.$route.params.id.split("&&")[2]);

      this.chatseleccionado = null;
      this.mensajes = [];
      clearInterval(this.myVar);

      this.e1 = 1;

      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    },

    ponercomoleidos: function (numerochat) {
      axios
        .post("http://localhost:54119/api/smartchat/ponercomoleidos", {
          idpropietario: this.$route.params.id.split("&&")[2],
          codigochat: numerochat,
        })
        .then((response) => {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    seleccionadogrupo: function (item, grupos) {
      var buscagrupo = "tarjeta" + item.ID;

      document.getElementById(buscagrupo).style.backgroundColor = "#FA8072";

      for (var i = 0; i < grupos.length; i++) {
        var quitar = "tarjeta" + grupos[i].ID;

        if (!(quitar === buscagrupo)) {
          console.log(quitar);
          console.log(buscagrupo);
          document.getElementById(quitar).style.backgroundColor = "#FFFFFF";
        }
      }

      this.chatseleccionado = item;
    },

    seleccionado: function (item, lista) {
      var buscarel = "tarjeta" + item.ID;
      document.getElementById(buscarel).style.backgroundColor = "#FA8072";

      for (var i = 0; i < lista.length; i++) {
        var quitar = "tarjeta" + lista[i].ID;

        if (!(quitar === buscarel)) {
          document.getElementById(quitar).style.backgroundColor = "#FFFFFF";
        }
      }

      this.chatseleccionado = item;
      console.log(
        "este ese el chat seleccionado ahora " + this.chatseleccionado
      );
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
        this.e1 = 2;

        var micodigo =
          typeof this.chatseleccionado.CODIGO !== "undefined"
            ? this.chatseleccionado.CODIGO
            : this.chatseleccionado.ID;

        this.chatactualizando = micodigo;

        if (micodigo == "") {
          this.crearChat();
        } else {
          this.chatyacreado(micodigo);
        }

        var miinput = document.getElementById("textomensaje");

        window.setTimeout(function () {
          miinput.focus();
        }, 1000);
      }
    },

    crearChat: function () {
      var tzoffset = new Date().getTimezoneOffset();
      var miDate = new Date(Date.now() - tzoffset * 60 * 1000);

      var m = miDate
        .toISOString()
        .slice(0, 19)
        .replace(/-/g, "/")
        .replace("T", " ");

      var codigodelchat = Date.now();

      axios
        .post("http://localhost:54119/api/smartchat/crearchat", {
          codigo: codigodelchat,
          inicio: m,
        })
        .then((response) => {
          this.chatseleccionado.CODIGO = codigodelchat;

          this.chatyacreado(response.data.codigo);
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    chatyacreado: function (valorchat) {
      axios
        .post("http://localhost:54119/api/smartchat/buscarmensajeschat", {
          codigo: valorchat,
        })
        .then((response) => {
          var dataArr = response.data.mensajes.map((item) => {
            return [item.DIA, item];
          }); // creates array of array
          var maparr = new Map(dataArr); // create key value pair from array of array

          var result = [...maparr.values()]; //converting back to array from mapobject

          //   this.mensajes = response.data.mensajes;

          this.mensajes = result;
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    mandarMensaje: function () {
      this.e1 = 2;

      if (this.mensajeescrito.length > 0) {
        var tzoffset = new Date().getTimezoneOffset();
        var miDate = new Date(Date.now() - tzoffset * 60 * 1000);

        var m = miDate
          .toISOString()
          .slice(0, 19)
          .replace(/-/g, "/")
          .replace("T", " ");

        var micodigo =
          this.chatseleccionado.CODIGO != null
            ? this.chatseleccionado.CODIGO
            : this.chatseleccionado.ID;

        if (this.chatseleccionado.CODIGO != null) {
          this.enviamensajeaxios(micodigo, m, this.chatseleccionado, false);
        } else {
          for (
            var miembro = 0;
            miembro < this.chatseleccionado.MIEMBROS.length;
            miembro++
          ) {
            this.enviamensajeaxios(
              micodigo,
              m,
              this.chatseleccionado.MIEMBROS[miembro],
              true
            );
          }
        }
        this.mensajeescrito = "";

        this.iniciarChat();
      }
    },

    enviamensajeaxios: function (micodigo, m, receptor, esgrupoono) {
      axios
        .post("http://localhost:54119/api/smartchat/crearmensaje", {
          contenido: this.mensajeescrito,
          usuarioid: this.$route.params.id.split("&&")[0],
          chatid: micodigo,
          dia: m,
          idusuariorecepcion: receptor.TELEFONO,
        })
        .then((response) => {
          //      this.mandarnotificacion(micodigo, receptor, esgrupoono);
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    mandarnotificacion: function (micodigo, receptor, esgrupoono) {
      var jdata = {
        michatid: micodigo,
        titulo: this.mensajeescrito,
        fotoreceptor: receptor.RUTA,

        fotoemisor: this.mifoto(),

        tokenaenviar: receptor.TOKEN,
        tokenemisor: this.$route.params.id.split("&&")[3],
        nombreemisor: this.$route.params.id.split("&&")[1],
        nombrereceptor: receptor.NOMBRE,
        telefonoemisor: this.$route.params.id.split("&&")[0],
        telefonoreceptor: receptor.TELEFONO,

        esgrupo: esgrupoono,
      };

      axios
        .post(
          "https://fcm.googleapis.com/fcm/send",
          {
            to: receptor.TOKEN,
            priority: "high",
            data: jdata,
          },
          {
            headers: {
              "content-type": "application/json",
              authorization:
                "key=AAAALyC3imA:APA91bGkws5JZsuIBDS0FCwzNb-Jsd9rtoAD5hdkAXfLZNvPGFAPWcshRfAoBmcoXi7EUxjKfKCeSpYf2i0NCMCzIfoOciLJohPQ-XANf_BriOXlJX0JPF-P1RBkuxs64a-maZG3IJb9",
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
      myVar: "",
      mensajeescrito: "",
      usuarioschat: [],
      dialog: false,
      dialogomiembros: false,
      dialogu: false,
      chatactualizando: "",

      ver: this.$props.tipo,

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
  font-size: 15pt !important;
}

.v-btn {
  margin-right: 20px;
}

.v-badge {
  margin-left: 0.7rem !important;
}

@media only screen and (max-width: 1000px) {
  .v-text-field {
    width: 500px;
    font-size: 15pt !important;
  }
}

@media only screen and (max-width: 1600px) {
  .v-text-field {
    width: 800px;
    font-size: 15pt !important;
  }
}
</style>