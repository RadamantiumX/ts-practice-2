# TypeScript 2

Como ya hemos aclaraod, TS no arregla los problemas en tiempo de ejecución, es por eso que no podemos hacer validaciones de datos con el (para eso hay otras librerias). Lo que hace TS es ayudarnos a mantener la seguridad y robustez en nuestro codigo, siempre con la ayuda de un lenguaje fuertemente *Tipado*.

**NADA DE TS SE EJECUTA EN EL CLIENTE**


## Enums

Son como las *Enumeraciones*. Vamos a ver un primer ejemplo en JS:


```js
const ERROR_TYPES = {
    NOT_FOUND: 'Not Found',
    UNAUTHORIZED: 'unauthorized',
    FORBIDDEN: 'forbidden'
}

function mostrarMensaje (tipoDeError) {
    if (tipoDeError === ERROR_TYPES.NOT_FOUND) {
        console.log('No se encuentra el recurso');
    } else if (tipoDeError === ERROR_TYPES.UNAUTHORIZED) {
        console.log('No tienes permisos para acceder')
    } else if (tipoDeError === ERROR_TYPES.FORBIDDEN) {
        console.log('No tienes los suficientes permisos')
    }

}
```
Este codigo esta en JS, y a simple se ve entendible y versátil. Pero en TS, hay algo llamado *Enums* (Enumeraciones). Estos ultimos, dependiendo de como los hagamos, se pueden compilar a JS o quizas no.

```ts
const enum ERROR_TYPES  {
    NOT_FOUND,
    UNAUTHORIZED,
    FORBIDDEN
}

function mostrarMensaje (tipoDeError: ERROR_TYPES) { // Usamos al ERROR_TYPES como un tipo
    if (tipoDeError === ERROR_TYPES.NOT_FOUND) {
        console.log('No se encuentra el recurso');
    } else if (tipoDeError === ERROR_TYPES.UNAUTHORIZED) {
        console.log('No tienes permisos para acceder')
    } else if (tipoDeError === ERROR_TYPES.FORBIDDEN) {
        console.log('No tienes los suficientes permisos')
    }

}
```
**Usamos una CONSTANTE para el *Enum* para evitar *transpilacion* entera a JS. Simplemente simplifica el codigo cuando llegue a ejecución. (Ver en PLAYGROUND)**

De todas formas, no es muy recomendado utilizar una *Constante* en los *Enums*, mucho menos si la aplicación se va a consumir desde afuera, ya que, esos *Types* pueden ser de utilidad cuando se peticione esa información.

A los *Enums* lo podemos utilizar para una colección de datos *finita*, por ejemplo, los días de la semana. Datos con poca cantidad de ellos, los cuales podamos manejar sin problemas.


## Aserciones de tipos

Tenemos un ejemplo donde queremos recuperar un elmento *HTML*, en este caso, un *canvas*:

```ts
const canvas = document.getElementById('canvas');
```
TS, no sabe que elemento es, ya que hemos mencionado, no funciona en tiempo de ejecución. En este caso, nosotros tenemos que indicarle de que elemento se trata.

Para este caso, TS nos puede devolver dos cosas, un *Null* o un *HMTLElement*, este ultimo al no saber cual es exactamente el elemento que va a encontrar. Nosotros el Tipo mas especifico, que es el *CanvasElement*.

Una forma podría ser con las *Aserción*:

```ts
const canvas = document.getElementById('canvas') as HTMLCanvasElement
```
Ahora, nosotros le decimos a TS de que Tipo es ese elemento, pero todavía podría ser NULL. Entonces, lo podríamos hacer después de la comprobación.

```ts
if (canvas !== null) {
    const ctx = (canvas as HTMLCanvasElement).getContext('2d')
}
```
Pero todavía puede tratarse de otro elemento HTML. Asi que lo único que nos queda es comprobrar si es una instancia dentro del condicional.

```ts	
if (canvas !== null && canvas instanceof HTMLCanvasElement) {
    const ctx = canvas.getContext('2d')
}
```
Con esto, TS ya se daría cuenta de que elemento es. Es *inferencia*, aunque se trate de otro elemento, si verifica que no es el correcto, no entra en el codigo, TS esta deduciendo todo esto. Esta sería la alternativa mas correcta.


## Aserciones Fetching

Al momento de hacer un FETCHING de datos, lo mas recomendado es utilizar herramientas externar para determinar los *TIPOS DE LA RESPUESTA*, puede ser *QuickType*: https://quicktype.io/

De esta forma, tenemos todos los *Types* que nos trae la respuesta del *fetch*.

```ts
const API_URL = "https://api.github.com/search/repositories?q=javascript"

const response = await fetch(API_URL) // Aca si que sabe el TYPE 

if (!response.ok) { // error
  throw new Error('Request failed')
}

// Si todo fue bien
const data = await response.json() as GitHubResponse// Transformamos a JSON

// recuperamos los datos de repositorios
data.items.map(repo => {
    return {
        name: repo.name,
        id: repo.id,
        url: repo.html_url,
    }
})
```

El *GitHubResponse* es el *Type* que nos generó la aplicación. 

***Adicionalmente a esto, podemos validar los datos en tiempo de ejecución, esto lo podemos lograr utilizando *QuickType*, pero también, con la ayuda de **TypeScript Zod** que es una de las opciones que podemos elegir al meomento de transformas los TIPOS. ***









