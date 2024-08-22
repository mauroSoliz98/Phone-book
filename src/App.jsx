import { useState, useEffect } from 'react'
import { Filter } from './components/Filter'
import { PersonForm } from './components/PersonForm'
import { Persons } from './components/Persons'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')  // Declara una variable de estado...
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('') //creamos un variable useState buleana

  useEffect(() => {
    async function fetchData() {
      const person = await axios.get('http://localhost:3004/persons')
      const response = await person.data
      setPersons(response)
      console.log(response);
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
    const personObject = {//Creamos un objeto con los mismos valores de la lista
      name: newName, //Añadimos la variable newName(lo que tenemos en nuestro input) al objeto
      number: newNumber,
    }
    //A continuacion usaremos axios para hacer un post
    const newPerson = await axios.post('http://localhost:3004/persons', personObject)
    const response = await newPerson.data
    console.log(response);
    setPersons(persons.concat(response))
    setNewName('')
    setNewNumber('')
    
  }
  
  //CREAMOS UNA VARIABLE FILTER QUE ES QUIEN SE ENCARGARÁ DE FILTRAR NUESTROS DATOS
  const myFilter = filterName 
                  ? persons.filter( person => person.name === filterName )
                  : persons 

  return (
    <div>
      <h2>Phonebook</h2>
       <Filter value={filterName} onChange={handleInputFilter} />
       <h3>Add new name</h3>
       <PersonForm addPerson={addPerson} newName={newName}  handleInputName={handleInputName}
                    newNumber={newNumber} handleInputNumber={handleInputNumber} />
      <h2>Numbers</h2>
      <Persons myFilter={myFilter}/>
    </div>
  )
}

export default App