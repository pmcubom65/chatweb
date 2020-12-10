import axios from "axios";


export const getUsuario=({commit}, usuario)=>{
    commit('SET_USUARIO', usuario);

}



export const getAmigos=({commit}, USUARIO)=>{
    axios
    .post("https://sdi2.smartlabs.es:30002/api/smartchat/mostraramigos", {
      idpropietario : USUARIO
    })
    .then((response)=> {


      commit('SET_AMIGOS', response.data.MIEMBROS);
    
    })
    .catch(function (error) {
      console.log(error);
    });

}



export const getGrupos=({commit}, USUARIO)=>{
  axios
  .post("https://sdi2.smartlabs.es:30002/api/smartchat/misgrupos", {
    telefono : USUARIO
  })
  .then((response)=> {

    console.log('recupero grupos' + response)
    commit('SET_GRUPOS', response.data.GRUPOS);
  
  })
  .catch(function (error) {
    console.log(error);
  });

}