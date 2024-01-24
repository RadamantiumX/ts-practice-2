# TypeScript 2

Como ya hemos aclaraod, TS no arregla los problemas en tiempo de ejecución, es por eso que no podemos hacer validaciones de datos con el (para eso hay otras librerias). Lo que hace TS es ayudarnos a mantener la seguridad y robustez en nuestro codigo, siempre con la ayuda de un lenguaje fuertemente *Tipado*.

**NADA DE TS SE EJECUTA EN EL CLIENTE**


## Enums

Son como las *Enumeraciones*. Vamos a ver un primer ejemplo en JS:


```js
function mostrarMensaje (tipoDeError) {
    if (tipoDeError === 'notFound') {
        console.log('No se encuentra el recurso');
    } else if (tipoDeError === 'unauthorized') {
        console.log('No tienes permisos para acceder')
    } else if (tipoDeError === 'forbidden') {
        console.log('No tienes los suficientes permisos')
    }

}
```

