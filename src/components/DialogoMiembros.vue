<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" width="700px">
      <v-card>
        <v-app-bar dark color="primary">
          <v-toolbar-title>Miembros del Grupo</v-toolbar-title>

          <v-spacer></v-spacer>
        </v-app-bar>

        <v-card-text>
          <v-list three-line v-for="item in miembros" v-bind:key="item.id">
            <v-list-item>
              <v-list-item-avatar>
                <v-img :src="construirRuta(item.RUTA)"></v-img>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title class="font-weight-black">{{ item.NOMBRE }}</v-list-item-title>
                <v-list-item-subtitle>{{ item.TELEFONO }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
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
export default {
  name: "DialogoMiembros",

  mounted() {
    this.$bus.$on("dialogomiembros", (parametros) => {

      this.miembros = parametros;
    });
  },
  methods: {
    close: function () {
      this.$emit("update:dialog", false);
    },

    construirRuta: function (ruta) {
      if (ruta.length > 0) {
        console.log("llega esta ruta " + ruta);

        var rutaprimaria='https://smartchat.smartlabs.es/';

        var rutaweb=rutaprimaria.concat(ruta.replace(/\\/g, "/").replace('//', '').replace("SRVWEB-01//inetpub//wwwroot//SmartChat", "").replace('//', '')).replace('"','')
        .replace('//img/', 'img');


         var indice= rutaweb.lastIndexOf('/');
        

         var rutawebfinal= rutaweb.substring(0,indice) + '' + rutaweb.substring(indice+1);




          console.log('esta es la ruta de los miembros '+rutawebfinal.slice(0, -1));

          return rutawebfinal.slice(0, -1);

      } else {
        return 'https://smartchat.smartlabs.es/img2/anonimos/No_image.jpg';
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
    };
  },
};
</script>



<style scoped>
.v-btn--text {
  font-size: 15pt !important;
}
</style>