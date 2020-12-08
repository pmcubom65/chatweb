export const SET_USUARIO=(state, usuario) => {

    state.usuario=usuario
}



export const SET_AMIGOS=(state, amigos) => {

    console.log('amigos en el mutations '+amigos)

    state.amigos=amigos;
}