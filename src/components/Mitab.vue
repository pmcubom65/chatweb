<template>

  <v-card  class="fade-in">
      <v-toolbar
      color="primary"
      height="90"
      dark
      flat
    >
    <v-tabs
      v-model="tab"
      background-color="primary"
      centered
      dark
      icons-and-text
    >
      <v-tabs-slider  color="yellow"></v-tabs-slider>

      <v-tab @click="volvermitab"  href="#chats">
        MIS CHATS
        <v-icon x-large>mdi-account</v-icon>
      </v-tab>

      <v-tab @click="volvermitab" href="#grupos">
        MIS GRUPOS
        <v-icon x-large>mdi-account-multiple</v-icon>
      </v-tab>
    </v-tabs>

        </v-toolbar>

    <v-tabs-items v-model="tab">
      <v-tab-item :key="1" value="chats">
        <v-card flat>
          <v-card-text></v-card-text>
  
          <mistepper  :tipo="true"></mistepper>
       
        </v-card>
      </v-tab-item>

      <v-tab-item :key="2" value="grupos">
        <v-card flat>
          <v-card-text></v-card-text>
  
          <mistepper   :tipo="false"></mistepper>
       
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-card>

</template>


<script>
import Mistepper from "./Mistepper.vue";

import axios from "axios";
import Router from "../router";

export default {
  name: "Mitab",

  components: { Mistepper },

  data() {
    return {
      tab: "",
      nombre: this.$route.params.id.split("&&")[1],
      telefono: this.$route.params.id.split("&&")[0],
      id: this.$route.params.id.split("&&")[2],


    };
  },

  props: {

  },

  methods : {

    volvermitab: function() {

       this.$bus.$emit('volvertab')

    }

  }


};
</script>


<style scoped>
.v-tab--active {
  background-color: rgba(167, 15, 15, 0.603);
}



</style>