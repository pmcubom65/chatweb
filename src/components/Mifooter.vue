<template>



  <v-app  class="animate__animated animate__fadeIn  animate__delay-1s">
    <v-app-bar
      app
      
      fixed
      dark
      bottom
 
    >



    <v-container>



 <v-row justify="end">
 

             <v-img
          alt="Logo"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="200"
          :src="logo"
          width="200"
 
        />

   
 </v-row>

    </v-container>
    </v-app-bar>
  </v-app>

</template>


<script>

  export default {
    name: 'Mifooter',
        

    data() {
      return {
          logo: this.$props.milogo
      }
    },

    props: {
      milogo: String
    }

  }
  </script>


<style scoped>
#mifoooter {

    color: black;
    margin-top: auto;
    margin-bottom: 0em;
    padding: 3em;
    text-align: center;
    display: block;
    clear: both;


    position: relative;
      height: 200px;
    margin-top: -200px;         
}


header.v-toolbar {
  background: linear-gradient(90deg, rgba(249,1,1,1) 0%, rgba(255,64,64,1) 35%, rgba(255,255,255,1) 100%) !important;
}

.container {
  margin-right: 0px !important;
}

</style>