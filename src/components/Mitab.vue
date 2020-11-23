<template>
  <v-card>
    <v-tabs
      v-model="tab"
      background-color="primary"
      centered
      dark
      icons-and-text
    >
      <v-tabs-slider></v-tabs-slider>

      <v-tab href="#chats">
        MIS CHATS
        <v-icon>mdi-account</v-icon>
      </v-tab>

      <v-tab href="#grupos">
        MIS GRUPOS
        <v-icon>mdi-account-multiple</v-icon>
      </v-tab>
    </v-tabs>

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

  }


};
</script>