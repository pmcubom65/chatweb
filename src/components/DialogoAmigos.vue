<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialogoamigos" width="900px">
      <v-card>
        <v-app-bar dark color="primary">
          <v-toolbar-title>{{ titular }}</v-toolbar-title>

          <v-spacer></v-spacer>
        </v-app-bar>

        <v-card-text>
          <v-layout justify-center>
            <v-row no-gutters>
              <v-card
                width="344"
                class="mx-auto"
                v-for="item in misamigos"
                v-bind:key="item.id"
              >
                <v-list-item>
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
                  <v-badge
                    v-if="item.MENSAJESSINLEER > 0"
                    color="green"
                    :content="item.MENSAJESSINLEER"
                  >
                  </v-badge>

                  <v-list-item-content>
                    <v-list-item-title class="headline">{{
                      item.NOMBRE
                    }}</v-list-item-title>
                    <v-list-item-subtitle>{{
                      item.EMAIL
                    }}</v-list-item-subtitle>

                    <v-row
                      align="center"
                      v-bind:class="{ midisplay: ponergrupos }"
                    >
                      <v-col class="d-flex" cols="12" sm="12">
                        <v-select 
                            v-on:change="valorCambiado($event, item.EMAIL)"

                          :items="grupos"
                          item-text="NOMBRE"
                          item-value="NOMBRE"
                          filled
                          label="Elija uno de sus grupos"
                        ></v-select>
                      </v-col>
                    </v-row>

                    <span :id="exitodelcontacto(item.EMAIL)"  class="novisible red--text font-weight-bold" >Añadido con éxito</span>


                  </v-list-item-content>
                </v-list-item>

      
              </v-card>
            </v-row>
          </v-layout>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" text @click.native="close">Cerrar</v-btn>
           <v-btn color="purple" text @click.native="actualizar" v-bind:class="{ midisplay: ponergrupos }">Aceptar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>



<script>
import axios from "axios";

export default {
  name: "DialogoAmigos",

  computed: {
    elusuario() {
      return this.$store.state.usuario;
    },

    misamigos(){
      return this.$store.state.amigos;
    }

  },

  mounted() {
  /*  this.$bus.$on("dialogoamigo", (parametros, parametros2) => {
      console.log("dialogoamigo " + parametros);

      this.contactosamigos = parametros;
    });*/

    this.contactosamigos = this.$store.state.amigos;

      this.usuariologadoygrupo = this.$store.state.usuario;

    this.$bus.$on("dialogoanadirusuarioagrupo", (parametro) => {
      this.ponergrupos = false;
      this.titular = "Añada contactos a sus grupos";
      this.grupos=parametro;

  

    });
  },

  methods: {

    valorCambiado: function(ag, otro){

        this.parejagrupoemail[otro]=ag;

    },



    close: function () {
      this.ponergrupos=true;
      this.titular='Mis Contactos';
      this.$emit("update:dialogoamigos", false);
    },

    exitodelcontacto: function(valor) {

      return 'exitodelcontacto'+valor;

    },



    actualizar: function() {


      console.log(this.parejagrupoemail);


      for (var key in this.parejagrupoemail) {

             this.anadiragrupo(key, this.parejagrupoemail[key]);
      }


     this.ponergrupos = true;
    // this.$store.dispatch("getGrupos", this.$route.params.id.split("&&")[0]);
    },

    anadiragrupo: function (email , nombregrupog) {


      axios
        .post("https://sdi2.smartlabs.es:30002/api/smartchat/anadirusuarioagrupo", {
          telefono: email,
          grupo: nombregrupog,
        })
        .then((response) => {


          if (response.data.grupo !== null) {

         var elementoseleccionado = "exitodelcontacto" + email;
         document.getElementById(elementoseleccionado).style.display = 'block';

          }
        })
        .catch((error) => {
          console.log(error);

        });
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
  },

  props: {
    dialogoamigos: {
      default: false,

    }
  },
  data() {
    return {
      contactosamigos: [],
      usuariologadoygrupo: {},
      idprop: "",
      ponergrupos: true,
      grupos: [],
 
      grupoelegido: null,
      titular: "Lista de Contactos",
      parejagrupoemail: []
    };
  },
};
</script>


<style scoped>
.v-card .v-sheet {
  margin-top: 1.5rem;
}

.v-btn--text {
  font-size: 15pt !important;
}

.midisplay {
  display: none;
}

label {
  color: red;
}


.novisible {
    display: none;
}


img {
  margin-right: 0.3rem;
}
</style>