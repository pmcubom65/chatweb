<template>
  <v-main>

      <v-container>
        <v-row justify="center">
          <v-col cols="12" sm="6">
            <h1 class="Heading 1">AUTENTICACION</h1>
          </v-col>
        </v-row>
      </v-container>

      <v-form>
        <v-container>
          <v-row justify="center">
            <v-col cols="12" sm="6">
              <v-text-field
                label="Número de Telefono"
                prepend-icon="mdi-account-circle"
                v-model="telefono"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row justify="center">
            <v-col cols="12" sm="6">
              <v-text-field
                label="Contraseña"
                prepend-icon="mdi-key"
                v-model="password"
                type="password"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row justify="center">
            <v-col cols="12" sm="6">
              <span class="red--text">{{ respuesta }}</span>
            </v-col>
          </v-row>

          <v-row justify="center">
            <v-col cols="12" sm="6">
              <v-btn
                x-large
                color="error"
                dark
                class="rounded-pill"
                @click="autenticar"
              >
                Iniciar Autenticación
              </v-btn>
            </v-col>
          </v-row>

          <v-row justify="center">
            <v-col cols="12" sm="6">
              <v-btn elevation="2" to="/registro">Registrarme</v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-form>


  </v-main>
</template>



<script>
import axios from "axios";
import Router from "../router";


export default {
  name: "autenticacion",

  data() {
    return {
      password: "",
      telefono: "",
      respuesta: "",
      amigos: [],
      valor: ''
    };
  },

  methods: {
    autenticar() {
      console.log("autentico");
      this.respuesta = "";

      axios
        .post("https://sdi2.smartlabs.es:30002/api/smartchat/hacerlogin", {
          password: this.password,
          telefono: this.telefono,
        })
        .then((response) => {
          console.log(response.data);

          if (response.data.codigo == 2) {
            this.respuesta = response.data.mensaje;
          } else {
            var nombreusuario = response.data.NOMBRE;
            var idusuario = response.data.ID;
            var telefonousuario = response.data.TELEFONO;
            var tokenusuario = response.data.TOKEN;
            var rutau=response.data.RUTA;

            var miusuario = {
              ID: idusuario,
              NOMBRE: nombreusuario,
              TELEFONO: telefonousuario,
              TOKEN: tokenusuario,
              RUTA: rutau
            };

             if (response.data.RUTA.length>0){
                   this.valor='https://smartchat.smartlabs.es/'+response.data.RUTA.replace(/\\/g, "/").replace('//', '').replace("SRVWEB-01/inetpub/wwwroot/SmartChat", "").replace('//', '/');
              }else {
                this.valor="https://smartchat.smartlabs.es/img2/anonimos/No_image.jpg";
              }

         

             this.$bus.$emit('fotousuario', this.valor)

          

            console.log("mi usuario es " + miusuario);
            this.$bus.$emit("menunavegacion", miusuario);
            this.cargarAmigos(idusuario, response.data.TELEFONO,response.data.NOMBRE,response.data.ID,response.data.TOKEN)


    


          }
        })
        .catch((error) => {
          console.log(error);
          this.respuesta = error;
        });
    },


    cargarAmigos: function(elidusuario, a,b,c,d) {
            axios
      .post("https://sdi2.smartlabs.es:30002/api/smartchat/mostraramigos", {
        idpropietario : elidusuario
      })
      .then((response)=> {

        console.log(response)

        console.log('amigos '+response.data.MIEMBROS)

        this.amigos=response.data.MIEMBROS    

                  var este = {
              ID: c,
              NOMBRE: b,
              TELEFONO: a,
              TOKEN: d,
    
            };




        this.$bus.$emit("dialogoamigo", response.data.MIEMBROS, este);    
        
        

                Router.push({
              path: `consola/${a}&&${b}&&${c}&&${d}`,
            });
      
      })
      .catch(function (error) {
        console.log(error);
      });
    }

  },
};
</script>


