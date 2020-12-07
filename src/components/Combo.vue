<template>

       <v-select
          :items="items"
          v-model="milogout"
          :label="usuariologado.NOMBRE"
          filled
          background-color="#545454"
           @change="logout"
        ></v-select>
      
</template>

<script>
export default {
    name: 'combo',
    mounted() {
        this.usuariologado = this.$store.state.usuario;
    },
    data() {
        return {
            usuariologado: '',
            milogout: null,
            items: ['Logout'],
            select: ''
        }
    },

    methods: {
        logout: function() {
            console.log('quiere hacer logoout');
            this.$router.push('/')
        }
    }



}
</script>