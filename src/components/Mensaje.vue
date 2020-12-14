<template>
  <v-card class="mx-auto" :color="micolor" dark min-width="400">
    <v-card-title>
      <span class="title font-weight-light">{{ dia.replace("T", " ") }}</span>
    </v-card-title>

    <v-card-text class="headline font-weight-bold">
      <div id="miflex">
        <div v-html="ponercontenidomensaje"></div>

        <v-tooltip top v-if="irchat && mostrariconos">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              id="mover"
              color="#6F00FF"
              fab
              @click="iralchatdesdecuadro"
              v-bind="attrs"
              v-on="on"
              dark
            >
              <v-icon>mdi-message-text-outline</v-icon>
            </v-btn>
          </template>
          <span>Responder</span>
        </v-tooltip>

        <v-tooltip top v-else-if="!irchat && mostrariconos">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              class="ma-2 ml-12"
              color="purple"
              fab
              @click="contactoanadido"
              v-bind="attrs"
              v-on="on"
              dark
            >
              <v-icon> mdi-account-check </v-icon>
            </v-btn>
          </template>
          <span
            >Este usuario no pertenece a sus contactos. Añadálo para conversar
            con él</span
          >
        </v-tooltip>


      </div>
    </v-card-text>

    <v-card-actions>
      <v-list-item class="grow">
        <v-list-item-avatar color="grey darken-3" v-if="foto.length == 0">
          <v-img
            class="elevation-6"
            alt="placeholder"
            src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
          ></v-img>
        </v-list-item-avatar>

        <v-list-item-avatar color="grey darken-3" v-else>
          <v-img
            class="elevation-6"
            alt="placeholder"
            :src="dameFoto()"
          ></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>{{ nombre }}</v-list-item-title>
        </v-list-item-content>

        <v-row align="center" justify="end"> </v-row>
      </v-list-item>
    </v-card-actions>
  </v-card>
</template>




<script>
import axios from "axios";
export default {
  name: "Mensaje",

  props: {
    mensaje: Object,
    mostrarirchat: {
      type: Boolean,
      required: false,
      default: false,
    },

    coniconos: {
      type: Boolean,
      required: false,
      default: false,
    },
    chat: {
      type: Object,
      required: false,
    },
    color: {
      type: String,
      required: false,
      default: "#FF0000",
    },
  },
  data() {
    return {
      mostrariconos: this.$props.coniconos,
      irchat: this.$props.mostrarirchat,
      contenido: this.$props.mensaje.CONTENIDO,
      nombre: this.$props.mensaje.NOMBRE,
      dia: this.$props.mensaje.DIA,
      foto: this.$props.mensaje.FOTO,
      archivoruta: this.$props.mensaje.ARCHIVOS,
      micodigomensaje: this.$props.mensaje.CODIGO,
      miid: this.$props.mensaje.ID,
      miemail: this.$props.mensaje.EMAIL,

      micolor: this.$props.color,
    };
  },
  methods: {
    dameFoto: function () {
      if (this.foto.length > 0 && !this.mostrariconos) {
        var miregexp = /[^:][/]{2}/g;

        return (
          "https://smartchat.smartlabs.es/" +
          this.$props.mensaje.FOTO.replace(/\\/g, "/")
            .replace("//", "")
            .replace("SRVWEB-01/inetpub/wwwroot/SmartChat", "")
            .replace("//", "/")
            .replace('"/', "")
            .replace(miregexp, "/")
        );
      } else if (this.foto.length > 0 && this.mostrariconos) {
        var miregexp = /[\/\/]{2}/g;

        var miruta =
          "https://smartchat.smartlabs.es" +
          this.$props.mensaje.FOTO.replace(/\\/g, "/")
            .replace("//", "")
            .replace("SRVWEB-01//inetpub//wwwroot//SmartChat", "")
            .replace("//", "")
            .replace('"/', "")
            .replace(miregexp, "/");

        var midigito = miruta.lastIndexOf(".");

        return miruta.substring(0, midigito + 4);
      } else {
        return "https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light";
      }
    },





    iralchatdesdecuadro: function () {
      this.$bus.$emit("cierrate", this.micodigomensaje, this.miid);
    },

    contactoanadido: function () {

      axios
        .post("https://sdi2.smartlabs.es:30002/api/smartchat/anadiramigo", {
          emailamigo: this.miemail,
          idpropietario: this.$store.state.usuario.ID,
        })
        .then((response) => {
          console.log(response);

          this.usuarioschat = response.data.MIEMBROS;

          this.$bus.$emit("actualizarstepper");


          this.iralchatdesdecuadro();

        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },

  computed: {
    ponercontenidomensaje: function () {
      if (this.contenido != null) {
        return `<span> ${this.contenido} </span>`;
      } else {
        var cadenaarchivo =
          "https://smartchat.smartlabs.es" +
          this.archivoruta[0].RUTA.replace(/\\/g, "/")
            .replace("//", "")
            .replace("SRVWEB-01/inetpub/wwwroot/SmartChat", "")
            .replace("//", "/");

        var nombrearchivo = cadenaarchivo.substring(
          cadenaarchivo.lastIndexOf("/") + 1
        );

        var extension = nombrearchivo.substring(
          nombrearchivo.lastIndexOf(".") + 1
        );

        if (
          extension == "png" ||
          extension == "jpg" ||
          extension == "jpeg" ||
          extension == "PNG" ||
          extension == "JPG" ||
          extension == "JPEG"
        ) {
          return `<img id="previewenmensaje" src="${cadenaarchivo}"><h4>
        <a target="_blank" href="${cadenaarchivo}"> ${nombrearchivo} </a></h4>`;
        } else {
          return `<a  target="_blank" href="${cadenaarchivo}"> ${nombrearchivo} </a>`;
        }
      }
    },
  },
};
</script>


<style scoped>
#miflex {
  display: flex;
}

#previewenmensaje {
  height: 100px;
  width: auto;
}

#mover {
  margin-left: 2rem;
}
</style>


