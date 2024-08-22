import { useState, useEffect } from 'react'
import { Filter } from './components/Filter'
import { PersonForm } from './components/PersonForm'
import { Persons } from './components/Persons'
import personServices from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')  // Declara una variable de estado...
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('') //creamos un variable useState buleana

  useEffect(() => {
    async function fetchData() {
      const initialPersons = await personServices.getAll()
      setPersons(initialPersons)
      console.log(initialPersons);
    }
    fetchData()
  }, [])
  

  //ACTUALIZA EL ESTADO DEL INPUT
  const handleInputName = (event) => {
    setNewName(event.target.value)
  }
  const handleInputNumber = (event) => {
    setNewNumber(event.target.value)
  }
  const handleInputFilter = (event) => {
    setFilterName(event.target.value)
  }

  //AÑADE UN NUEVOS OBJETO A LA LISTA
  const addPerson = async (event) => {
    event.preventDefault()
    let id = persons.length + 1
    const personObject = {//Creamos un objeto con los mismos valores de la lista
      name: newName, //Añadimos la variable newName(lo que tenemos en nuestro input) al objeto
      number: newNumber,
      id: id.toString()
    }
    //A continuacion usaremos axios para hacer un post
    const newPerson = await personServices.create(personObject)
    console.log(newPerson);
    setPersons(persons.concat(newPerson))
    setNewName('')
    setNewNumber('')
    
  }
  //ELIMINAR ELEMENTO
  const toggleDeleteOf = async(person) => {
    const {id, name} = person //desestructuramos el objeto
    if (window.confirm(`¿Quieres elminar a ${name}?`)) {
        try {
          await personServices.deleteObj(id);//Llamamos al servicio delete
          const updatedPersons = persons.filter(person => person.id !== id);
          /*filter crea un nuevo array con todos los elementos que pasen la condición 
          implementada en la función de callback.Por ende la manera de interpretar la linea de
          codigo seria la siguiente "Todo aquellos elemento que no sean iguales al id seleccionado,
          pasan al nuevo array"*/
          setPersons(updatedPersons);
        } catch (error) {
          console.error('Error al eliminar la persona:', error);
        }
      }
  }
  
  //CREAMOS UNA VARIABLE FILTER QUE ES QUIEN SE ENCARGARÁ DE FILTRAR NUESTROS DATOS
  const myFilter = filterName 
                  ? persons.filter( person => person.name.toLowerCase().startsWith(filterName.toLowerCase()))
                  : persons 

  return (
    <div>
      <h2>Phonebook</h2>
       <Filter value={filterName} onChange={handleInputFilter} />
       <h3>Add new name</h3>
       <PersonForm addPerson={addPerson} newName={newName}  handleInputName={handleInputName}
                    newNumber={newNumber} handleInputNumber={handleInputNumber} />
      <h2>Numbers</h2>
      { myFilter.map((person, i) =>
        <Persons key={i} 
                person={person} 
                onDelete={() => toggleDeleteOf(person)}/>
      
      )}
    </div>
  )
}

export default App