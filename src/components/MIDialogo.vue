<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" width="950px" :fullscreen="$vuetify.breakpoint.xsOnly">
      <v-card>
        <v-app-bar dark color="primary">
          <v-toolbar-title>Subir Archivos</v-toolbar-title>

          <v-spacer></v-spacer>
        </v-app-bar>

        <v-card-text>
          <h2 class="display-1 font-weight-black" id="titulocuadro">
            Suba sus archivos en el área
          </h2>

          <div>
            <div
              id="drop-area"
              @dragover="dragover"
              @dragleave="dragleave"
              @drop="drop"
            >
              <v-icon
                size="300"
                v-bind:style="hayarchivo ? 'display: none;' : 'display: block;'"
                color="primary"
                >mdi-cloud-upload</v-icon
              >

              <input
                type="file"
                multiple
                name="fields[assetsFieldHandle][]"
                id="assetsFieldHandle"
                class="w-px h-px opacity-0 overflow-hidden absolute"
                @change="onChange"
                ref="file"
                accept=".pdf,.jpg,.jpeg,.png"
              />

              <ul class="mt-4" v-if="this.filelist.length" v-cloak>
                <li
                  class="text-sm p-1 box"
                  v-for="file in filelist"
                  v-bind:key="file.id"
                >
                  <v-icon large color="red darken-2">mdi-content-save</v-icon>
                  <h2 class="mt-8 ml-5  pr-12">{{ file[0].name }}</h2>

                  <v-btn
                    class="mx-2 mr-7 mt-5"
                    fab
                    dark
                    small
                    color="primary"
                    @click="remove(filelist.indexOf(file))"
                  >
                    <v-icon dark>mdi-minus</v-icon>
                  </v-btn>

                  <img :id="preview(file[0].name)" class="mipreview" />
                </li>
              </ul>
            </div>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" text @click.native="close">Cancelar</v-btn>

          <v-btn
            color="purple"
            text
            @click.native="subirarchivo"
            :disabled="noarchivos"
            >Subir</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>


<script>
import axios from "axios";
export default {
  name: "MiDialogo",

  mounted() {
    this.$bus.$on("dialog", (parametros) => {
      this.chatid = parametros.chatid;
      this.idusuariorecepcion = parametros.idusuariorecepcion;

      console.log("chat id " + this.chatid);
      console.log("idusuariorecepcion " + this.idusuariorecepcion);
    });
  },

  props: {
    dialog: {
      default: false,
    },
  },
  methods: {
    close: function () {
      this.hayarchivo = false;
      this.$emit("update:dialog", false);
    },

    preview: function(name) {
        return 'archivo'+name;
    },

    subirarchivo: function () {
      if (this.filelist.length > 1 && this.chatid.length == 0) {
        this.alertafotoperfil =
          "Solo puede adjuntar un archivo como foto de perfil";
      } else {
        for (var j = 0; j < this.filelist.length; j++) {
          var reader = new FileReader();
          reader.readAsDataURL(this.filelist[j][0]);

          console.log(this.filelist[j][0].name);

          this.nombredelarchivo = this.filelist[j][0].name;

          reader.onload = () => {
            console.log(reader.result);

            this.crearmensajeconarchivo(reader.result);
          };
        }
        this.$emit("update:dialog", false);
      }
    },

    crearmensajeconarchivo: function (contenidoarchivo) {
      var tzoffset = new Date().getTimezoneOffset();
      var miDate = new Date(Date.now() - tzoffset * 60 * 1000);

      var m = miDate
        .toISOString()
        .slice(0, 19)
        .replace(/-/g, "-")
        .replace("T", " ");

      console.log(miDate);

      if (!Array.isArray(this.idusuariorecepcion)) {
        this.peticionAxios(contenidoarchivo, m, this.idusuariorecepcion);
      } else {
        for (var u = 0; u < this.idusuariorecepcion.length; u++) {
          this.peticionAxios(
            contenidoarchivo,
            m,
            this.idusuariorecepcion[u].TELEFONO
          );
        }
      }

      this.hayarchivo = false;
    },

    peticionAxios: function (contenidoarchivo, m, usuariorecepcion) {
      axios
        .post("https://sdi2.smartlabs.es:30002/api/smartchat/almacenarimagen", {
          IMAGEN: contenidoarchivo,
          ID: this.$route.params.id.split("&&")[2],
          CHAT_ID: this.chatid,
          DIA: m,
          EXTENSION: this.nombredelarchivo.split(".")[1],
          EMISOR: this.$route.params.id.split("&&")[0],
          RECEPTOR: usuariorecepcion,
        })
        .then((response) => {
          console.log(response);

          this.filelist = [];

          //    this.mandarnotificacion();

          if (this.chatid == "") {
            var elusuario = JSON.parse(
              window.localStorage.currentusersmartchat
            );
            elusuario.RUTA = this.construirRuta(response.data.RUTA);
            window.localStorage.currentusersmartchat = JSON.stringify(
              elusuario
            );

            this.$store.dispatch("getUsuario", elusuario);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    onChange() {
      this.filelist.push(this.$refs.file.files);

      let readeronchange = new FileReader();
      let vm = this;
      var miimagena='archivo'+this.$refs.file.files[0].name;
      readeronchange.onload = (e) => {

        document.getElementById(miimagena).src=e.target.result;

      };
      readeronchange.readAsDataURL(this.$refs.file.files[0]);
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

    remove(i) {
      this.filelist.splice(i, 1);
    },
    dragover(event) {
      event.preventDefault();
      // Add some visual fluff to show the user can drop its files
      if (!event.currentTarget.classList.contains("bg-green-300")) {
        event.currentTarget.classList.remove("bg-gray-100");
        event.currentTarget.classList.add("bg-green-300");
      }
    },
    dragleave(event) {
      // Clean up
      event.currentTarget.classList.add("bg-gray-100");
      event.currentTarget.classList.remove("bg-green-300");
    },
    drop(event) {
      event.preventDefault();
      this.noarchivos = false;
      this.hayarchivo = true;
      this.$refs.file.files = event.dataTransfer.files;
      this.onChange(); // Trigger the onChange event manually
      // Clean up

      event.currentTarget.classList.add("bg-gray-100");
      event.currentTarget.classList.remove("bg-green-300");
    },
  },
  data() {
    return {
      show: false,
      filelist: [],
      chatid: "",
      idusuariorecepcion: "",
      nombredelarchivo: "",
      hayarchivo: false,
      noarchivos: true,
      alertafotoperfil: "",
      imagenver: "",
    };
  },
};
</script>



<style scoped>
ul {
  list-style-type: none;
}
#titulocuadro {
  margin-top: 50px;
  margin-bottom: 0px;
}

#drop-area {
  border: 10px dashed red;
  border-radius: 20px;
  width: 780px;
  height: 500px;


  margin: 100px auto;
  padding: 20px;
}


@media only screen and (max-width: 770px) {
#drop-area {
      width: 500px;
      height: 500px;
  }
}




#drop-area.highlight {
  border-color: red;
}

#assetsFieldHandle {
  display: none;
}

.box {
  display: flex;
  flex-direction: row;
  vertical-align: middle;
  margin-top: 5px;
  margin-bottom: 5px;

  
}


.mdi-cloud-upload {
  margin-left: 90px;
}

.v-btn--text {
  font-size: 15pt !important;
}

.mipreview {
  height: 100px;
  width: auto;
  border: 5px dashed red;
  margin-left: 5px;
}

.mdi-cloud-upload {
  margin: 0 30%;
}


@media only screen and (max-width: 770px) {
.v-icon {
      margin: 0 20%;
  }
}



</style>