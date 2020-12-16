<template>
  <div>
    <div class="cabecera d-flex">
      <div class="image-cropper">
        <imagenaqui></imagenaqui>
      </div>

      <div class="margen">
        <h1 class="display-3 font-weight-bold">
          <span id="smallbv">Bienvenido</span> {{ nombre }}
        </h1>

        <h3 class="font-italic">
          <span id="smallbv">Email:</span> {{ telefono }}
        </h3>
      </div>

      <v-chip
        class="ma-2 ml-8 animate__animated animate__bounce animate__repeat-3"
        color="primary"
        text-color="white"
        x-large
        @click="miresumen"
        v-if="calcular"
      >
        {{ numero }}
        <v-icon right> mdi-forum </v-icon>
      </v-chip>
    </div>

    <dialogo-resumen-no-leidos
      :noleidos.sync="dialonoleidos"
      :idpropietario="id"
    ></dialogo-resumen-no-leidos>

    <div id="panel">
      <mitab></mitab>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Mitab from "../../components/Mitab.vue";
import fire from "../../firebase";

import Imagenaqui from "../../components/Imagenaqui";

import Router from "../../router";

import DialogoResumenNoLeidos from "../../components/DialogoResumenNoLeidos";

export default {
  components: { Mitab, DialogoResumenNoLeidos, Imagenaqui },

  name: "consola",

  data: function () {
    return {
      nombre: this.$route.params.id.split("&&")[1],
      telefono: this.$route.params.id.split("&&")[0],
      id: this.$route.params.id.split("&&")[2],
      valor: "",
      dialonoleidos: false,
      noleidosresumendatos: Array,
      numero: "",
    };
  },
  computed: {
    calcular: function () {
      return parseInt(this.numero, 10) > 0;
    },
  },

  methods: {
    miresumen: function () {
      this.dialonoleidos = true;
    },

    escribioalguien: function () {
      if (typeof this.noleidosresumendatos.mensajesnoleidos == "undefined") {
        return this.noleidosresumendatos.mensajesnoleidos.length > 0;
      } else {
        return false;
      }
    },

    crearUsuario: function (valortoken) {
      axios
        .post(
          "https://sdi2.smartlabs.es:30002/api/smartchat/crearusuarioconemail",
          {
            nombre: this.nombre,
            email: this.telefono,
            token: valortoken,
          }
        )
        .then((response) => {
          console.log("usuario grabado");
          console.log(response.data);

          var miusuario = {
            ID: response.data.id,
            NOMBRE: response.data.nombre,
            TELEFONO: response.data.telefono,
            TOKEN: response.data.token,
            RUTA: this.$store.state.usuario.RUTA,
          };

          this.$store.dispatch("getUsuario", miusuario);
          window.localStorage.removeItem("currentusersmartchat");
          window.localStorage.currentusersmartchat = JSON.stringify(miusuario);
        });
    },

    resumennoleidos: function (idpropietarioid) {
      axios
        .post("https://sdi2.smartlabs.es:30002/api/smartchat/noleidosresumen", {
          idpropietario: this.$store.state.usuario.ID,
        })
        .then((response) => {
          this.$bus.$emit("mismensajesnoleidos", response.data);

          this.numero = response.data.mensajesnoleidos.length;

          //   this.noleidosresumendatos=response.data.mensajesnoleidos;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },

  mounted: function () {
    if (localStorage.getItem("currentusersmartchat") === null) {
      Router.push({
        path: "/",
      });
    }

    /* Router.push({
            path: `consola/${this.dameusuario.TELEFONO}&&${this.dameusuario.NOMBRE}&&${this.dameusuario.ID}&&${this.dameusuario.TOKEN}`,
          });*/

    setInterval(() => {
      this.resumennoleidos(this.id);
    }, 1000);

    const messaging = fire.messaging();
    messaging.requestPermission();
    const token = messaging.getToken().then((data) => {
      setTimeout(() => {
        //   console.log(data);
        this.crearUsuario(data);
      }, 3000);
    });

    messaging.onMessage((payload) => {
      //    console.log("Message received. ", payload.data);

      const notificationTitle = payload.data.nombreemisor;
      const notificationOptions = {
        body: payload.data.titulo,
        icon: payload.data.fotoemisor,
      };

      const laurl = payload.data.click_action;

      if (Notification.permission === "granted") {
        var notification = new Notification(
          notificationTitle,
          notificationOptions
        );
        notification.onclick = function (event) {
          event.preventDefault(); // prevent the browser from focusing the Notification's tab
          window.open(laurl, "_blank");
          notification.close();
        };
      }

      this.$bus.$emit("actualizarstepper");
    });

    this.$bus.$on("probaranimacion", () => {
      var mipanel = document.getElementById("panel");

      console.log("ejecuto animacion " + mipanel);
      const unaanimacion = "animate__animated";
      const dosanimacion = "animate__slideInUp";
      const tresa = "animate__slower";
   //   const cuatro = "animate__delay-1s";
      mipanel.classList.add(unaanimacion);
      mipanel.classList.add(dosanimacion);
      mipanel.classList.add(tresa);
 //     mipanel.classList.add(cuatro);
    });

    this.$bus.$on("quitaranimacion", () => {
      var mipanel = document.getElementById("panel");
      console.log("quito animacion " + mipanel);

            const unaanimacion = "animate__animated";
      const dosanimacion = "animate__slideInUp";
      const tresa = "animate__slower";
  //    const cuatro = "animate__delay-1s";

 
        mipanel.classList.remove(unaanimacion);
        mipanel.classList.remove(dosanimacion);
        mipanel.classList.remove(tresa);
  //      mipanel.classList.remove(cuatro);
      
    });
  },
};
</script>


<style scoped>
#panel {
  margin-top: 0px;
}

.cabecera {
  padding-top: 100px;
  padding-bottom: 100px;
}

h1 {
  margin-bottom: 20px;
}

.image-cropper {
  width: 100px;
  height: 100px;

  border-radius: 50%;
}

.margen {
  margin-left: 2.5rem;
}

@media (max-width: 1200px) {
  #smallbv {
    display: none;
  }

  .display-3 {
    font-size: 35pt !important;
  }
}
</style>