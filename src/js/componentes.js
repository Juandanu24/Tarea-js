import '../css/componentes.css'
// import webpackLogo from '../assets/img/webpack-logo.png';

export const saludar = (nombre) => {

    console.log('Saludar');
    const h1 = document.createElement('h1');
    h1.innerText = `Hola ${nombre}`
    document.body.append(h1);

    //Img
    // const imagen = document.createElement('img');
    // imagen.src = webpackLogo;
    // document.body.append(imagen); 
}   