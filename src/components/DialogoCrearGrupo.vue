<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialogogrupo" width="700px">
      <v-card>
        <v-app-bar dark color="primary">
          <v-toolbar-title>{{ tituloventana }}</v-toolbar-title>

          <v-spacer></v-spacer>
        </v-app-bar>

        <v-card-text>
          <div class="d-flex">
            <div>
              <v-text-field
                v-model="nombregrupo"
                label="Escriba un nombre de Grupo"
                :disabled="!muestromiembros"
              ></v-text-field>
            </div>

            <div>
              <v-btn
                class="mx-2"
                fab
                dark
                large
                color="red"
                @click="creargrupo"
                v-bind:class="{ midisplay: !muestromiembros }"
              >
                <v-icon dark>mdi-checkbox-marked</v-icon>
              </v-btn>
            </div>
          </div>

          <h6 class="title" v-bind:class="{ midisplay: hayerror }">
            {{ mensajeerror }}
          </h6>

          <div>
            <v-list two-line v-bind:class="{ midisplay: muestromiembros }">
                <h5 class="title red--text mb-3">Añada contactos al grupo</h5>

              <div v-for="item in amigosagrupo" v-bind:key="item.id">
                <div class="box">
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

                  <h6 class="title">{{ item.NOMBRE }}</h6>

                  <v-btn
                    fab
                    dark
                    small
                    color="primary"
                    @click="anadiragrupo(item.TELEFONO)"
                    :id="anadidoconexitoboton(item.TELEFONO)"
                  >
                    <v-icon x-large dark>mdi-comment-plus-outline</v-icon>
                  </v-btn>

                  <v-list-item-subtitle
                    class="red--text font-weight-bold midisplay mialerta"
                    :id="anadidoconexito(item.TELEFONO)"
                    >Contacto añadido al grupo con éxito</v-list-item-subtitle
                  >
                </div>
              </div>
            </v-list>
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
  name: "DialogoCrearGrupo",

  mounted() {
    this.$bus.$on("dialogoamigo", (parametros, parametros2) => {
   
      this.amigosagrupo = parametros;
 
    });



    this.$bus.$on("menunavegacion", (parametros) => {
   
      this.usuariologado = parametros;

   
    });




  },

  data() {
    return {
      nombregrupo: "",
      idgrupo: "",
      mensajeerror: "",
      usuariologado: {},

     
      
      grupohecho: false,
      hayerror: true,
      muestromiembros: true,

      amigosagrupo: [],
      tituloventana: "Crear Grupo",
    };
  },
  props: {
    dialogogrupo: {
      default: false,
    },
  },

  methods: {
    close: function () {

        this.grupohecho=false;
      this.hayerror=true;
      this.muestromiembros=true;
      this.amigosagrupo= [];
      this.tituloventana= "Crear Grupo";
      this.mensajeerror="";


      this.$emit("update:dialogogrupo", false);
    },

    anadidoconexito: function(valor) {

        return 'anadidoconexito'+valor;

    },

    anadidoconexitoboton: function(valor) {

        return 'anadidoconexitoboton'+valor;

    },

    creargrupo: function () {
      axios
        .post("https://sdi2.smartlabs.es:30002/api/smartchat/creargrupo", {
          nombre: this.nombregrupo,
        })
        .then((response) => {
          console.log(response.data.ID);

          if (response.data.ID !== null) {
            this.idgrupo = response.data.ID;

            this.crearChat(response.data.ID);

            this.tituloventana =
              "Añada contactos al Grupo: " + this.nombregrupo;
            this.grupohecho = true;

            this.hayerror = true;
            this.muestromiembros = false;

            this.anadiragrupo(this.usuariologado.TELEFONO);
          }
        })
        .catch((error) => {
          console.log(error);
          this.grupohecho = false;

          this.hayerror = false;
          this.muestromiembros = true;
        });
    },


    
    crearChat: function (codigochat) {
     

      var tzoffset = new Date().getTimezoneOffset();
      var miDate = new Date(Date.now() - tzoffset * 60 * 1000);

      var m = miDate
        .toISOString()
        .slice(0, 19)
        .replace(/-/g, "/")
        .replace("T", " ");

      axios
        .post("https://sdi2.smartlabs.es:30002/api/smartchat/crearchat", {
          codigo: codigochat,
          inicio: m,
        })
        .then((response) => {
              console.log('chat del grupo creado');
        })
        .catch(function (error) {
          console.log(error);
        });
    },









    anadiragrupo: function (email) {
      axios
        .post("https://sdi2.smartlabs.es:30002/api/smartchat/anadirusuarioagrupo", {
          telefono: email,
          grupo: this.nombregrupo,
        })
        .then((response) => {
          if (response.data.grupo !== null) {
            this.grupohecho = true;



            var contactoseleccionado = "anadidoconexito" + email;
            var contactobotonseleccionado =
              "anadidoconexitoboton" + email;

            document.getElementById(contactobotonseleccionado).style.display =
              "none";
            document.getElementById(contactoseleccionado).style.display =
              "block";
    
          }
        })
        .catch((error) => {
          console.log(error);

          this.hayerror = false;
          this.muestromiembros = false;
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
};
</script>

<style scoped>
.box {
  display: flex;
}

.d-flex {
  margin-top: 3rem !important;
  margin-bottom: 3rem !important;
}

.v-btn {
  margin-left: 3rem;
}

h6.title {
  margin-top: 1.1rem;
  margin-left: 1rem;
}

.v-text-field {
  width: 500px;

  font-size: 15pt !important;
}

.midisplay {
  display: none;
}

.v-btn--text {
  font-size: 15pt !important;
}


.mialerta {
    font-size: 13pt !important;
    margin-top: 1.5rem;
    margin-left: 0.9rem;
}


</style>