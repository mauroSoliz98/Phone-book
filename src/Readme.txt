Información basada en: 
https://fullstackopen.com/es/part1/un_estado_mas_complejo_depurando_aplicaciones_react#revision-de-los-controladores-de-eventos

Hola este pequeño fragamento de react vamos a aprender acerca de matrices y a manejar eventos.
Pero antes de irnos al codigo, hay ver lo que es una matriz
Matriz en programación es una colección ordenada de elementos de un mismo tipo, organizados en uno
o más dimenciones,en el mundo de la programción se les suele llamar arreglos o arrays.
En JavaScript nosotros podemos elaborar arreglos de strings, enteros, objetos, etc y la manejar
de inicializar una matriz es la siguiente

let arrayEnteros = [1,2,3,4,5]
let arrayStrings = ["dato 1", "dato 2", "dato 3"]
let arrayObjetos = [{Objeto 1},{Objeto 2}, {Objeto 3}]

Para este segmento haremos uso de los metodos de programacion funcional -find, filter y map-

¿Qué es un manejador de eventos?
Un controlador de eventos es un método que está enlazado a un evento. Cuando ese evento se genera, 
el código del controlador de eventos se ejecuta. Cada controlador de eventos proporciona dos 
parámetros que permiten controlar el evento correctamente.

En react nosotros contamos con controladores de eventos como:
onClick --> Botones, imagenes, div's... 
onSubmit --> Formularios
onChange --> Inputs
...
Ahora en react los controladores de eventos solo admiten una funcion o una referencia a una funcion

<button onClick="crap...">button</button> <---esta mal ya que le estamos pasando un string 
al controladors
El error será el siguiente:
index.js:2178 Warning: Expected `onClick` listener to be a function, instead got a value of `string` type.
    in button (at index.js:20)
    in div (at index.js:18)
    in App (at index.js:27)

La forma correcta sería:
<button onClick={()=>console.log('clicked the button')}>
  button
</button>

Pero tambien:
const App = () => {
  const [value, setValue] = useState(10)

  const handleClick = () =>
    console.log('clicked the button')

  return (
    <div>
      {value}
      <button onClick={handleClick}>button</button>
    </div>
  )
}
