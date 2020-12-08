<template>
<div>
  <div class="cabecera d-flex">



    <div class="image-cropper">
        <imagenaqui></imagenaqui>

    </div>


    

    <div class="margen">
      <h1 class="display-3 font-weight-bold">Bienvenido {{ nombre }}</h1>

      <h3 class="font-italic">Email: {{telefono}}</h3>
      
    </div>



  
     

     <v-chip
      class="ma-2 animate__animated animate__bounce animate__repeat-3"
      color="primary"
      text-color="white"
      x-large
       @click="miresumen"
       v-if="calcular"
       
    >
      {{numero}} 
      <v-icon right>
            mdi-forum
      </v-icon>
    </v-chip>



  </div>

  
  <dialogo-resumen-no-leidos :noleidos.sync="dialonoleidos"  :idpropietario="id"></dialogo-resumen-no-leidos>


  
    <div class="panel">
      <mitab></mitab>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Mitab from "../../components/Mitab.vue";
import fire from "../../firebase";

import Imagenaqui from '../../components/Imagenaqui'

import Router from '../../router';

import DialogoResumenNoLeidos from '../../components/DialogoResumenNoLeidos'


export default {
  components: { Mitab, DialogoResumenNoLeidos, Imagenaqui},

  name: "consola",



  data: function () {
    return {
      nombre: this.$route.params.id.split("&&")[1],
      telefono: this.$route.params.id.split("&&")[0],
      id: this.$route.params.id.split("&&")[2],
      valor: '',
        dialonoleidos: false,
      noleidosresumendatos: Array,
      numero: ''
      
    };
  },
  computed: {
        calcular: function() {
      return typeof numero=== 'string' && parseInt(this.numero, 10)>0
    },


  },

  methods: {



    miresumen: function() {

    this.dialonoleidos = true;


    },

    escribioalguien: function() {

        if (typeof this.noleidosresumendatos.mensajesnoleidos== "undefined") {

          return this.noleidosresumendatos.mensajesnoleidos.length>0;

        }else {

          return false;

        }

        


    },




    crearUsuario: function(valortoken){
                 axios
        .post("https://sdi2.smartlabs.es:30002/api/smartchat/crearusuarioconemail", {
          nombre: this.nombre,
          email: this.telefono,
          token: valortoken,
        })
        .then((response) => {
          console.log('usuario grabado')
          console.log(response);


      })
    },

resumennoleidos: function(idpropietarioid) {


   axios
      .post("https://sdi2.smartlabs.es:30002/api/smartchat/noleidosresumen", {
        idpropietario: idpropietarioid
      })
      .then((response)=> {


 
        this.$bus.$emit("mismensajesnoleidos", response.data)


        this.numero=response.data.mensajesnoleidos.length

     //   this.noleidosresumendatos=response.data.mensajesnoleidos;


      })
      .catch(function (error) {
        console.log(error);
      
      });



}


  },

  mounted :  function() {



       setInterval(() => {
      this.resumennoleidos(this.id);
     
    }, 1000);







  /*    const messaging= fire.messaging();
      messaging.requestPermission();
      const token = messaging.getToken().then((data)=>{
        setTimeout(()=>{
          console.log(data);
      this.crearUsuario(data)
        },3000);
      });*/

   /*    axios
      .post("https://sdi2.smartlabs.es:30002/api/smartchat/buscarUsuarioConEmail", {
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
                this.valor="https://smartchat.smartlabs.es/img2/anonimos/No_image.jpg";
              }

         

             this.$bus.$emit('fotousuario', this.valor)
        }

      })
      .catch(function (error) {
        console.log(error);
      
      });*/


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


  border-radius: 50%;

}

.margen {
  margin-left: 2.5rem;
}

</style>