<template>
  <v-layout row justify-center>
    <v-dialog
      v-model="dialogologout"
      width="700px"
      :fullscreen="$vuetify.breakpoint.xsOnly"
    >
      <v-card>
        <v-app-bar dark color="primary">
          <v-toolbar-title>Cerrar Sesión</v-toolbar-title>

          <v-spacer></v-spacer>
        </v-app-bar>

        <v-card-text>
          <div class="text-center espaciotop">
            <h4 class="display-1 font-weight-bold text-md-center">
              ¿Quiere abandonar la sesión? <br />
              Tendrá que autenticarse de nuevo en el próximo acceso
            </h4>
          </div>
          <div class="text-center">
            <v-btn
              x-large
              color="error"
              dark
              class="rounded-pill"
              @click="confirmarcierre"
            >
              <v-icon large color="#FFFFFF"> mdi-human-greeting </v-icon>
              Sí, quiero abandonar la sesión
            </v-btn>
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
import Router from "../router";
import axios from "axios";
export default {
  name: "DialogoLogout",

  props: {
    dialogologout: {
      default: false,
    },
  },

  data() {
    return {};
  },

  methods: {
    close: function () {
      this.$emit("update:dialogologout", false);
    },

    confirmarcierre: function () {
      this.$store.dispatch("getUsuario", null);

      window.localStorage.removeItem("currentusersmartchat");
      this.$bus.$emit("hayusuariograbado", false);
      this.$emit("update:dialogologout", false);
      Router.push({
        path: "/",
      });
      window.location.reload(false);
    },
  },
};
</script>


<style scoped>
.espaciotop {
  margin-top: 3rem;
  margin-bottom: 3rem;
}

.v-btn--text {
  font-size: 15pt !important;
}
</style>