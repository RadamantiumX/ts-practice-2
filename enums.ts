// Si son recursos que se van a consumir desde afuera, el CONST no es recomendado
const enum ERROR_TYPES  {
    NOT_FOUND = 'notFound', // 0 (en JS)
    UNAUTHORIZED = 'unauthorized', // 1 (en JS)
    FORBIDDEN = 'fobidden' // 2 (en JS)
}

function mostrarMensaje (tipoDeError: ERROR_TYPES) { // Al ENUM lo podemos usar como TIPO
    if (tipoDeError === ERROR_TYPES.NOT_FOUND) {
        console.log('No se encuentra el recurso');
    } else if (tipoDeError === ERROR_TYPES.UNAUTHORIZED) {
        console.log('No tienes permisos para acceder')
    } else if (tipoDeError === ERROR_TYPES.FORBIDDEN) {
        console.log('No tienes los suficientes permisos')
    }

}


