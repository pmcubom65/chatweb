<template>
<div>
  <div class="cabecera d-flex">
        <div class="image-cropper">
     <img :src="valor" class="rounded">
    </div>
    <div>
      <h1 class="display-3 font-weight-bold">Bienvenido {{ nombre }}</h1>

      <h3 class="font-italic">Email: {{telefono}}</h3>
    </div>


  </div>

  
    <div class="panel">
      <mitab></mitab>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Mitab from "../../components/Mitab.vue";
import fire from "../../firebase";

import Router from '../../router';

export default {
  components: { Mitab },

  name: "consola",



  data: function () {
    return {
      nombre: this.$route.params.id.split("&&")[1],
      telefono: this.$route.params.id.split("&&")[0],
      id: this.$route.params.id.split("&&")[2],
      valor: '',
      
    };
  },


  methods: {
    crearUsuario: function(valortoken){
                 axios
        .post("http://localhost:54119/api/smartchat/crearusuarioconemail", {
          nombre: this.nombre,
          email: this.telefono,
          token: valortoken,
        })
        .then((response) => {
          console.log('usuario grabado')
          console.log(response);

      })
    }
  },

  mounted :  function() {

      const messaging= fire.messaging();
      messaging.requestPermission();
      const token = messaging.getToken().then((data)=>{
        setTimeout(()=>{
          console.log(data);
      this.crearUsuario(data)
        },3000);
      });

    

   


       axios
      .post("http://localhost:54119/api/smartchat/buscarUsuarioConEmail", {
        telefono: this.telefono
      })
      .then((response)=> {

        console.log(response);

        if (response.data.codigo==2){
          this.crearUsuario(this.telefono);
        }else {

              if (response.data.RUTA.length>0){
                   this.valor='https://smartchat.smartlabs.es/'+response.data.RUTA.replace(/\\/g, "/").replace('//', '').replace("SRVWEB-01/inetpub/wwwroot/SmartChat", "").replace('//', '/');
              }else {
                this.valor="https://i.picsum.photos/id/151/4288/3216.jpg?hmac=JivxjfdKJyVImNz441oXhdQzbKCO6Ko_m9th03i_T0M"
              }

         

             this.$bus.$emit('fotousuario', this.valor)
        }

      })
      .catch(function (error) {
        console.log(error);
      
      });


      }




    
  
 



};
</script>


<style scoped>
.panel {
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
  position: relative;
  overflow: hidden;
  border-radius: 50%;
  margin-right: 70px;
}

img.rounded {
  object-fit: cover;
  border-radius: 50%;
  height: 100px;
  width: 100px;
}
</style>