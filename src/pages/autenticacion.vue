<template>

 <v-main>
    <v-container>
        <v-row justify="center" >
              <v-col 
          cols="12"
          sm="6"
        >
          <h1 class="Heading 1">AUTENTICACION</h1>

              </v-col>

        </v-row>
    </v-container>



<v-form>
    <v-container>
      <v-row justify="center" >
        <v-col 
          cols="12"
          sm="6"
        >
          <v-text-field
            label="Número de Telefono"
            prepend-icon="mdi-account-circle"
            v-model="telefono"
          
          ></v-text-field>
        </v-col>

      </v-row>



            <v-row justify="center">
        <v-col
          cols="12"
          sm="6"
        >
          <v-text-field
            label="Contraseña"
            prepend-icon="mdi-key"
            v-model="password"
           
          ></v-text-field>
        </v-col>

      </v-row>

      <v-row justify="center">

           <v-col
          cols="12"
          sm="6"
        >

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
        <v-col
          cols="12"
          sm="6"
        >
        <v-btn
            elevation="2"
               to="/registro"
        >Registrarme</v-btn>



        </v-col>

          </v-row>
    </v-container>
</v-form>



  </v-main>




</template>



<script>
import axios from 'axios';
import Router from '../router';


export default {
name: 'autenticacion',



data() {
    return {
        password: '',
        telefono : ''
    }
},

methods : {




    autenticar() {
        console.log('autentico');

        axios.post('http://localhost:54119/api/smartchat/hacerlogin', {
            password: this.password,
            telefono: this.telefono
            })
            .then(function (response) {

              console.log(response)

            var nombreusuario=response.data.NOMBRE;
            var idusuario=response.data.ID;
            var telefonousuario=response.data.TELEFONO;
            var tokenusuario=response.data.TOKEN;

            var miusuario= {
              ID : idusuario,
              NOMBRE: nombreusuario,
              TELEFONO: telefonousuario,
              TOKEN: tokenusuario
            };

            console.log('mi usuario es '+miusuario);
    
            Router.push({ path: `consola/${miusuario.TELEFONO}&&${miusuario.NOMBRE}&&${miusuario.ID}&&${miusuario.TOKEN}`})


            })
            .catch(function (error) {
              console.log(error);
             });
    }

}

    
}
</script>


