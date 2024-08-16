import { useState } from 'react'
import { Filter } from './components/Filter'
import { PersonForm } from './components/PersonForm'
import { Persons } from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')  // Declara una variable de estado...
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('') //creamos un variable useState buleana

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

  //AÑADE TEMPORALMENTE UN NUEVOS OBJETO A LA LISTA
  const addPerson = (event) => {
    event.preventDefault()
    const nameObject = {//Creamos un objeto con los mismos valores de la lista
      name: newName, //Añadimos la variable newName(lo que tenemos en nuestro input) al objeto
      number: newNumber,
    }
    setPersons(persons.concat(nameObject))//Agregamos ese objeto a nuestra lista persons
    setNewName('')//Limpiamos el input
    setNewNumber('')
    alert(`${newName} was added`)
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