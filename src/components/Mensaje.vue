<template>
  <v-card class="mx-auto" :color="micolor" dark min-width="400">
    <v-card-title>
      <span class="title font-weight-light">{{ dia.replace("T", " ") }}</span>
    </v-card-title>

    <v-card-text class="headline font-weight-bold">
      <div id="miflex">
        <div v-html="ponercontenidomensaje"></div>

        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              id="mover"
              color="#6F00FF"
              fab
              @click="iralchatdesdecuadro"
              v-if="irchat"
              v-bind="attrs"
              v-on="on"
              dark
            >
              <v-icon>mdi-message-text-outline</v-icon>
            </v-btn>
          </template>
          <span>Responder</span>
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
    chat: {
      type: Object,
      required: false,
    },
    color: {
      type: String,
      required: false,
      default: "#FF0000",
    }
  },
  data() {
    return {
      irchat: this.$props.mostrarirchat,
      contenido: this.$props.mensaje.CONTENIDO,
      nombre: this.$props.mensaje.NOMBRE,
      dia: this.$props.mensaje.DIA,
      foto: this.$props.mensaje.FOTO,
      archivoruta: this.$props.mensaje.ARCHIVOS,
      micodigomensaje: this.$props.mensaje.CODIGO,
      miid: this.$props.mensaje.ID,

      micolor: this.$props.color,
    };
  },
  methods: {
    dameFoto: function () {
      if (this.foto.length > 0) {

        var miregexp=/[^:][/]{2}/g;

        console.log('foto cristina '+"https://smartchat.smartlabs.es/" +
          this.$props.mensaje.FOTO.replace(/\\/g, "/")
            .replace("//", "")
            .replace("SRVWEB-01/inetpub/wwwroot/SmartChat", "")
            .replace("//", "/").replace('"/','').replace(miregexp, '/'));

        return (
          "https://smartchat.smartlabs.es/" +
          this.$props.mensaje.FOTO.replace(/\\/g, "/")
            .replace("//", "")
            .replace("SRVWEB-01/inetpub/wwwroot/SmartChat", "")
            .replace("//", "/").replace('"/','').replace(miregexp, '/')
        );
      } else {
        return "https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light";
      }
    },

    iralchatdesdecuadro: function () {
      this.$bus.$emit("cierrate", this.micodigomensaje, this.miid);
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

        return `<a  target="_blank" href="${cadenaarchivo}"> ${nombrearchivo} </a>`;
      }
    },
  },
};
</script>


<style scoped>
#miflex {
  display: flex;
}

#mover {
  margin-left: 2rem;
}
</style>


