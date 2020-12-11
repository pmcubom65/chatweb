<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialogousuarios" width="700px">
      <v-card>
        <v-app-bar dark color="primary">
          <v-toolbar-title
            >Seleccione Usuarios a Añadir a Mis Contactos</v-toolbar-title
          >

          <v-spacer></v-spacer>
        </v-app-bar>

        <v-card-text>
          <div class="autocomplete">
            <div class="input" @click="toggleVisible"></div>
            <div class="popover" v-show="visible">
              <input
                type="text"
                v-model="buscarpornombre"
                placeholder="Escriba aquí el nombre de alguien..."
                @click="clicktexto"
              />
              <div class="options">
                <ul>
                  <li
                    v-for="match in matches"
                    v-bind:key="match.id"
                    class="font-weight-black"
                    @click="
                      usuarioseleccionado(match['NOMBRE'], match['EMAIL'])
                    "
                  >
                    {{ match["NOMBRE"] }}
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div v-if="hayseleccion" class="tarjetadelseleccionado">
            <v-list-item>
              <v-list-item-icon>
                <v-icon size="25"> mdi-account-circle</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title class="font-weight-black">{{
                  nombreelegido
                }}</v-list-item-title>
                <v-list-item-subtitle>{{ emailelegido }} </v-list-item-subtitle>

                <v-list-item-subtitle>
                  <v-progress-circular
                    id="espiralbuscador"
                    v-bind:class="{ midisplay: pensando }"
                    indeterminate
                    color="green"
                  ></v-progress-circular>
                </v-list-item-subtitle>

                <v-list-item-subtitle
                  class="novisible red--text font-weight-bold"
                  :id="seleccionado(emailelegido)"
                  >{{ respuestadd }}</v-list-item-subtitle
                >

                <v-btn
                  elevation="2"
                  @click="contactoanadido(emailelegido)"
                  :id="botonseleccionado(emailelegido)"
                  >Añadir a Contactos</v-btn
                >
              </v-list-item-content>
            </v-list-item>
          </div>
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
    });
  },

  methods: {
    usuarioseleccionado: function (nombre, correo) {
      this.pensando = true;

      this.buscarpornombre = nombre;

      this.hayseleccion = true;
      this.nombreelegido = nombre;
      this.emailelegido = correo;
    },

    toggleVisible: function () {
      this.visible = !this.visible;
      this.hayseleccion = false;
      this.respuestadd = "";
      this.pensando = true;
      if (this.emailelegido != "") {
        var elementoseleccionado = "seleccionado" + this.emailelegido;

        document.getElementById(elementoseleccionado).style.display = "none";
      }
    },

    clicktexto: function () {
      this.hayseleccion = false;
      this.respuestadd = "";
      this.buscarpornombre = "";

      if (this.emailelegido != "") {

          var elementoseleccionado = "seleccionado" + this.emailelegido;

          document.getElementById(elementoseleccionado).style.display = "none";

          this.emailelegido = "";
        
      }
    },

    seleccionado: function (ID) {
      return "seleccionado" + ID;
    },
    botonseleccionado: function (ID) {
      return "botonseleccionado" + ID;
    },
    close: function () {
      this.respuestadd = "";
      this.pensando = true;
      this.$emit("update:dialogousuarios", false);
    },
    contactoanadido: function (item) {
      this.pensando = false;

      axios
        .post("https://sdi2.smartlabs.es:30002/api/smartchat/anadiramigo", {
          emailamigo: item,
          idpropietario: this.$store.state.usuario.ID,
        })
        .then((response) => {
          this.usuarioschat = response.data.MIEMBROS;
          var elementoseleccionado = "seleccionado" + item;
          var botonseleccionado = "botonseleccionado" + item;
          console.log(response);
          document.getElementById(botonseleccionado).style.display = "none";
          document.getElementById(elementoseleccionado).style.display = "block";

          if (response.data.codigo == 2) {
            this.respuestadd =
              "El usuario no se ha dado de alta en la aplicación. Usuario no añadido a contactos";
          } else {
            this.respuestadd = "Contacto añadido con éxito";
            this.$bus.$emit("actualizarstepper");
          }

          var espiralb = document.getElementById("espiralbuscador");
          espiralb.style.animation = "none";
          espiralb.offsetHeight; /* trigger reflow */
          espiralb.style.animation = null;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
  props: {
    dialogousuarios: {
      default: false,
    },
  },
  computed: {
    matches() {
      if (this.buscarpornombre == "") {
        this.hayseleccion = false;
        return [];
      }

      var miarray = this.usuarios.filter((usuario) => {
        console.log(
          "en el filter " +
            usuario["NOMBRE"].includes(this.buscarpornombre.toLowerCase())
        );

        return usuario["NOMBRE"]
          .toLowerCase()
          .includes(this.buscarpornombre.toLowerCase());

        //String(usuario[this.filterby]).toLowerCase().includes(this.buscarpornombre).toLowerCase()
      });

      console.log(miarray);
      return miarray;
    },
  },

  data() {
    return {
      visible: false,
      usuarios: [],
      idprop: "",
      emailprop: "",
      respuestadd: "",
      buscarpornombre: "",
      filterby: "NOMBRE",
      hayseleccion: false,
      nombreelegido: "",
      emailelegido: "",
      pensando: true,
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
  animation: cssAnimation 0s ease-in 5s forwards;
  opacity: 0;
  margin-top: 0px;
}

@keyframes cssAnimation {
  100% {
    opacity: 1;
  }
}

.autocomplete {
  width: 100%;
  position: relative;
  margin-top: 5rem;
}

.input {
  height: 40px;
  border-radius: 3px;
  border: 2px solid lightgrey;
  box-shadow: 0 10px #eceaea;
  font-size: 25px;
  padding-left: 10px;
  padding-top: 10px;
  cursor: text;
}

.popover {
  min-height: 50px;
  border: 2px solid lightgrey;
  text-align: center;
}

.popover input {
  width: 100%;
  margin-top: 5px;
  height: 40px;
  font-size: 16px;
  border-radius: 3px;
  border: 1px solid lightgray;
  padding-left: 8px;
}
.options {
  max-height: 150px;
  overflow-y: scroll;
  margin-top: 4px;
}

ul {
  list-style-type: none;
  text-align: left;
  padding-left: 0px;
}

li {
  border-bottom: 1px solid lightgrey;
  padding: 5px;
  cursor: pointer;
  background: lightsalmon;
}

.tarjetadelseleccionado {
  margin-top: 3rem;
}

.midisplay {
  display: none;
  opacity: 0;
}

#espiralbuscador {
  animation: ani 0s 5s forwards;
}

@keyframes ani {
  89% {
    opacity: 1;
    height: 100px;
  }
  90% {
    opacity: 0;
    height: 0;
  }
  100% {
    opacity: 0;
    height: 0;
  }
}
</style>
