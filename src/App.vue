<template>
  <v-app>
    <v-app-bar app fixed dark>
      <div class="d-flex align-center">
        <div v-bind:class="{ midisplay: !logado }">
          <v-btn icon @click.stop="drawer = !drawer">
            <v-icon color="black">mdi-menu</v-icon>
          </v-btn>
        </div>

        <router-link :to="rutaconsola">
          <v-img
            alt="Logo"
            class="shrink mt-1"
            contain
            min-width="200"
            :src="logo"
            width="200"
        
          />
        </router-link>
      </div>

      <v-spacer></v-spacer>

      <div v-if="!logado">
        <v-btn @click="miscroll"
          ><span class="mr-2">Código qr</span>
          <v-icon>mdi-open-in-new</v-icon>
        </v-btn>

        <v-btn to="/autenticacion" text>
          <span class="mr-2">Iniciar Autenticación</span>
          <v-icon>mdi-open-in-new</v-icon>
        </v-btn>
      </div>

      <div v-else>
        <combo></combo>
      </div>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      absolute
      width="500"
      height="250vh"
      :src="require('@/assets/fondorojonegro.jpg')"
      temporary
    >
      <div id="cabeceradrawer">
        <div>
          <v-list-item-avatar>
            <v-img :src="elusuario.RUTA"></v-img>
          </v-list-item-avatar>
        </div>

        <div id="bajar">
          <div class="white--text">{{ elusuario.NOMBRE }}</div>
        </div>
      </div>

      <v-divider class="white--text"></v-divider>

      <v-list dense>
        <v-list-item
          @click="menuActionClick(item.action)"
          v-for="item in items"
          :key="item.title"
          link
        >
          <v-list-item-content>
            <div class="box">
              <v-list-item-icon>
                <v-icon class="white--text">{{ item.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-title class="white--text">{{
                item.title
              }}</v-list-item-title>
            </div>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <dialogo-usuarios-chat
        :dialogousuarios.sync="dialogu"
      ></dialogo-usuarios-chat>

      <dialogo-crear-grupo :dialogogrupo.sync="dialogg"></dialogo-crear-grupo>

      <dialogo-amigos :dialogoamigos.sync="dialogoamigo"></dialogo-amigos>
      <mi-dialogo :dialog.sync="dialogofoto"></mi-dialogo>
    </v-navigation-drawer>

    <v-main>
      <router-view></router-view>
      <Mifooter :milogo="logo"></Mifooter>
    </v-main>
  </v-app>
</template>

<script>
import Mifooter from "./components/Mifooter.vue";
import Router from "./router";

import DialogoUsuariosChat from "./components/DialogoUsuariosChat.vue";
import DialogoAmigos from "./components/DialogoAmigos.vue";
import MiDialogo from "./components/MIDialogo";
import DialogoCrearGrupo from "./components/DialogoCrearGrupo";
import axios from "axios";

import Combo from "./components/Combo.vue";

export default {
  name: "App",
  components: {
    Mifooter,
    DialogoUsuariosChat,
    DialogoUsuariosChat,
    DialogoAmigos,
    MiDialogo,
    DialogoCrearGrupo,
    DialogoCrearGrupo,
    Combo,
  },

  mounted() {
    this.estalogado = false;

    this.miusuario = this.$store.state.usuario;

    if (localStorage.getItem("currentusersmartchat") !== null) {
      this.logado = true;
    } else {
      this.logado = false;
    }

    this.$bus.$on("hayusuariograbado", (boleano) => {
      this.logado = boleano;
    });

    //this.rutahome = `${this.miusuario.TELEFONO}&&${this.miusuario.NOMBRE}&&${this.miusuario.ID}&&${this.miusuario.TOKEN}`;

    axios
      .post(
        "https://sdi2.smartlabs.es:30002/api/smartchat/buscarcontactosweb",
        {}
      )
      .then((response) => {
        this.usuarioschat = response.data.MIEMBROS;
      })
      .catch(function (error) {
        console.log(error);
      });
  },

  computed: {
    lafoto() {
      return this.$store.state.usuario.RUTA;
    },

    elusuario() {
      return this.$store.state.usuario;
    },

    rutaconsola() {
      if (localStorage.getItem("currentusersmartchat") === null) {
        Router.push({
          path: "/",
        });

        return '/';
      } else {
        var uno = this.$store.state.usuario.TELEFONO;
        var dos = this.$store.state.usuario.NOMBRE;
        var tres = this.$store.state.usuario.ID;
        var cuatro = this.$store.state.usuario.TOKEN;

        return "/consola/" + uno + "&&" + dos + "&&" + tres + "&&" + cuatro;
      }
    },
  },

  data() {
    return {
      logo: require("@/assets/logo.png"),
      estalogado: true,
      drawer: null,
      miusuario: {},
      fotousuario: "",
      dialousuarioschat: false,
      rutahome: "/",
      dialogoamigo: false,
      dialogofoto: false,
      dialogg: false,
      usuarioschat: [],
      grupos: [],
      logado: false,
      dialogu: false,
      items: [
        { title: "Inicio", icon: "mdi-view-dashboard", action: "inicio" },
        {
          title: "Subir Foto de Perfil",
          icon: "mdi-clippy",
          action: "subirfoto",
        },
        { title: "Mis Contactos", icon: "mdi-forum", action: "miscontactos" },
        {
          title: "Buscar Contactos",
          icon: "mdi-account-check",
          action: "buscarcontactos",
        },
        {
          title: "Crear Grupo",
          icon: "mdi-account-group",
          action: "creargrupo",
        },
        {
          title: "Unir usuario a un grupo",
          icon: "mdi-account-multiple-plus",
          action: "anadirusuariogrupo",
        },
      ],
    };
  },

  methods: {
    menuActionClick: function (accion) {
      switch (accion) {
        case "inicio":
          console.log("inicio");
          window.location.reload(false);
          break;

        case "subirfoto":
          this.dialogofoto = true;

          var parametros = {
            chatid: "",
            idusuariorecepcion: "",
          };

          this.$bus.$emit("dialog", parametros);

          break;

        case "miscontactos":
          console.log("miscontactos");
          this.dialogoamigo = true;

          break;

        case "buscarcontactos":
          this.dialogu = true;
          this.$bus.$emit(
            "dialousuarioschat",
            this.usuarioschat,
            this.miusuario
          );

          break;

        case "creargrupo":
          console.log("creargrupo");
          this.dialogg = true;

          break;

        case "anadirusuariogrupo":
          console.log("anadirusuariogrupo");

          axios
            .post("https://sdi2.smartlabs.es:30002/api/smartchat/misgrupos", {
              telefono: this.$store.state.usuario.TELEFONO,
            })
            .then((response) => {
              console.log("buscando grupos " + response);
              this.grupos = response.data.GRUPOS;

              this.dialogoamigo = true;

              this.$bus.$emit(
                "dialogoanadirusuarioagrupo",
                response.data.GRUPOS
              );
            })
            .catch(function (error) {
              console.log(error);
            });

          break;
      }
    },

    logout: function () {
      console.log(accion);
    },

    miscroll: function () {
      this.$bus.$emit("realizarscroll");
    },
  },
};
</script>

<style scoped>
.midisplay {
  display: none;
}

.v-list-item {
  padding-left: 0px !important;
  padding-right: 0px !important;
}

.v-list-item__title {
  font-size: 1.3em !important;
  padding: 0.5rem;
}

.v-list-item__content:hover {
  background-color: red;
}

.v-list-item__content {
  padding-left: 4rem !important;
}

#cabeceradrawer {
  height: 15vh;
  display: flex;
  margin-top: 4rem;
  margin-left: 2rem;
  font-size: 1.4rem !important;
}

.v-list-item__icon {
  font-size: 1.3em;
  padding: 0.5rem;
}

.box {
  display: flex;
}

#bajar {
  margin-top: 0.5rem;
}


#cabeceradrawer {
  padding-left: 3rem;
}

.v-navigation-drawer--close.v-navigation-drawer--temporary {
    transform: translateX(-13vw) !important;
}

header.v-toolbar {
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 1) 0%,
    rgba(253, 29, 29, 1) 50%,
    rgba(255, 0, 0, 1) 100%
  ) !important;
}
</style>