export default function validarCrearProducto(valores) {

    let errores = {};

    // Validar el nombre de usuario
    if(!valores.nombre) {
        errores.nombre = 'El Nombre es obligatorio';
    }

    // Validar empresa
    if(!valores.empresa) {
        errores.empresa = 'Nombre de empresa es obligatorio';
    }

    // Validar url
    if(!valores.url) {
        errores.url = 'La URL del producto es obligatorio';
    } else if(!/^(ftp|http|https):\/\/[^ "]+$/.test(valores.url)) {
        errores.url = 'URL no válida'
    }

    // Validar descripcion
    if(!valores.descripcion) {
        errores.descripcion = 'Agrega la descripcion del producto';
    }


    return errores;
}