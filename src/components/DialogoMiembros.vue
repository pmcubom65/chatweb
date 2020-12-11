<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" width="700px">
      <v-card>
        <v-app-bar dark color="primary">
          <v-toolbar-title>Miembros del Grupo</v-toolbar-title>

          <v-spacer></v-spacer>
        </v-app-bar>

        <v-card-text>
          <div v-if="quieresalir">
            <v-list three-line v-for="item in miembros" v-bind:key="item.id">
              <v-list-item>
                <v-list-item-avatar>
                  <v-img :src="construirRuta(item.RUTA)"></v-img>
                </v-list-item-avatar>

                <v-list-item-content>
                  <div class="box">
                    <div>
                      <v-list-item-title class="font-weight-black">{{
                        item.NOMBRE
                      }}</v-list-item-title>
                      <v-list-item-subtitle>{{
                        item.TELEFONO
                      }}</v-list-item-subtitle>
                    </div>

                    <div v-if="resolver(item.TELEFONO)">
                      <v-tooltip top>
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn
                            color="primary"
                            fab
                            dark
                            v-bind="attrs"
                            v-on="on"
                            @click="salirgrupo(item.TELEFONO)"
                          >
                            <v-icon>mdi-human-greeting</v-icon>
                          </v-btn>
                        </template>
                        <span>Salir del grupo</span>
                      </v-tooltip>
                    </div>
                  </div>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </div>
          <div v-else>
            <div class="text-xs-center espaciotop">
              <h3 class="display-1 font-weight-bold text-md-center">
                ¿Quieres realmente abandonar este grupo?
              </h3>
            </div>
            <div class="text-xs-center">
              <v-btn
                x-large
                color="error"
                dark
                class="rounded-pill"
                @click="confirmado"
              >
                <v-icon large color="#FFFFFF">
                  mdi-human-greeting
                </v-icon>
                Sí, quiero salir
              </v-btn>
            </div>
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
  name: "DialogoMiembros",

  mounted() {
    this.$bus.$on("dialogomiembros", (parametros, idgrupo) => {
      this.miembros = parametros;
      this.idg = idgrupo;
    });
  },

  methods: {
    close: function () {
      this.quieresalir=true;
      this.$emit("update:dialog", false);
    },

    resolver: function (email) {
      return email == this.$store.state.usuario.TELEFONO;
    },

    salirgrupo: function (email) {
      this.quieresalir = false;
    },

    confirmado: function () {

        axios
        .post("https://sdi2.smartlabs.es:30002/api/smartchat/salirgrupo", {
          telefono: this.$store.state.usuario.TELEFONO,
          grupo: this.idg,
        })
        .then((response) => {})
        .catch(function (error) {
          console.log(error);
        });

      this.$emit("update:dialog", false);
    },

    construirRuta: function (ruta) {
      if (ruta.length > 0) {
        var rutaprimaria = "https://smartchat.smartlabs.es/";

        var rutaweb = rutaprimaria
          .concat(
            ruta
              .replace(/\\/g, "/")
              .replace("//", "")
              .replace("SRVWEB-01//inetpub//wwwroot//SmartChat", "")
              .replace("//", "")
          )
          .replace('"', "")
          .replace("//img/", "img");

        var indice = rutaweb.lastIndexOf("/");

        var rutawebfinal =
          rutaweb.substring(0, indice) + "" + rutaweb.substring(indice + 1);

        return rutawebfinal.slice(0, -1);
      } else {
        return "https://smartchat.smartlabs.es/img2/anonimos/No_image.jpg";
      }
    },
  },

  props: {
    dialog: {
      default: false,
    },
  },

  data() {
    return {
      miembros: [],
      idg: "",
      quieresalir: true,
    };
  },
};
</script>



<style scoped>
.v-btn--text {
  font-size: 15pt !important;
}

.box {
  display: flex;
}

.v-btn {
  margin-left: 13rem;
}

.espaciotop {
  margin-top: 3rem;
  margin-bottom: 2.5rem;
}
</style>