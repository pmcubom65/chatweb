<template>
  <v-card class="mx-auto" :color="micolor" dark min-width="400">
    <v-card-title>
      <span class="title font-weight-light">{{ dia.replace("T", " ") }}</span>
    </v-card-title>

    <v-card-text class="headline font-weight-bold">
      {{ ponercontenidomensaje }}
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
    chat: Object,
    color: String,
  },
  data() {
    return {
      contenido: this.$props.mensaje.CONTENIDO,
      nombre: this.$props.mensaje.NOMBRE,
      dia: this.$props.mensaje.DIA,
      foto: this.$props.mensaje.FOTO,
      archivoruta: this.$props.mensaje.ARCHIVOS,

      micolor: this.$props.color,
    };
  },
  methods: {
    dameFoto: function () {
      if (this.foto.length > 0) {
        return (
          "https://smartchat.smartlabs.es/" +
          this.$props.mensaje.FOTO.replace(/\\/g, "/")
            .replace("//", "")
            .replace("SRVWEB-01/inetpub/wwwroot/SmartChat", "")
            .replace("//", "/")
        );
      } else {
        return "https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light";
      }
    },
  },

  computed: {
    ponercontenidomensaje: function () {
      if (this.contenido != null) {
        return this.contenido;
      } else {
        return (
          "https://smartchat.smartlabs.es/" +
          this.archivoruta[0].RUTA.replace(/\\/g, "/")
            .replace("//", "")
            .replace("SRVWEB-01/inetpub/wwwroot/SmartChat", "")
            .replace("//", "/")
        );
        
     
        
      }
    },
  },
};
</script>


