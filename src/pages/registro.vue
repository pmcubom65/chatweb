<template>

 <v-main>
    <v-container>
        <v-row justify="center" >
              <v-col 
          cols="12"
          sm="6"
        >
          <h1 class="Heading 1">REGISTRARME</h1>

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

              @click="registro"
              
            >
              Registrarme
            </v-btn>

           </v-col>
      </v-row>

    </v-container>
</v-form>

  </v-main>

</template>



<script>
import axios from 'axios';


export default {
name: 'registro',

data() {
    return {
        password: '',
        telefono : ''
    }
},

methods : {

    registro() {
        console.log('autentico');

        axios.post('http://localhost:54119/api/smartchat/verusuarioypass', {
            telefono: this.telefono,
            password: this.password
            })
            .then(function (response) {
            console.log(response);
            })
            .catch(function (error) {
              console.log(error);
             });
    }

}

    
}
</script>