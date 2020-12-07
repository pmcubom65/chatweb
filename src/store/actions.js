import axios from "axios";

export const getUsuario=({commit}, usuario)=>{
    commit('SET_USUARIO', usuario);

}



export const getAmigos=({commit}, id)=>{
    axios
    .post("https://sdi2.smartlabs.es:30002/api/smartchat/mostraramigos", {
      idpropietario : id
    })
    .then((response)=> {

      console.log('estos son mis amigotes '+response.data)

      console.log('amigos '+response.data.MIEMBROS)

      commit('SET_AMIGOS', response.data.MIEMBROS);
    
    })
    .catch(function (error) {
      console.log(error);
    });

}