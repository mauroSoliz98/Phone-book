import { useState, useEffect } from 'react'
import { Filter } from './components/Filter'
import { PersonForm } from './components/PersonForm'
import { Persons } from './components/Persons'
import personServices from './services/persons'
import { Modal } from './components/Modal'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')  // Declara una variable de estado...
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('') //creamos un variable useState buleana
  const [isOpen, setIsOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState([])

  const getPersons = async() => {
    try {
    const initialPersons = await personServices.getAll()
    setPersons(initialPersons)
    console.log(initialPersons);
    } catch(error) { 
      console.log(error);
      
    }
  }

  useEffect(() => { 
    getPersons()
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
          setPersons(updatedPersons);
          /*filter crea un nuevo array con todos los elementos que pasen la condición 
          implementada en la función de callback.Por ende la manera de interpretar la linea de
          codigo seria la siguiente "Todo aquellos elemento que no sean iguales al id seleccionado,
          pasan al nuevo array"*/
        } catch (error) {
          console.error('Error al eliminar la persona:', error);
        }
      }
  }
  //EDITAR EL ELEMENTO
  const showModal = (id) => {
    console.log(`El id es: ${id}`)
    setIsOpen(true)

    const person = persons.find(p => p.id === id)
    setSelectedItem(person)
  }
  const handdleUpdate = async (id) => {
      console.log(`modificaste el elemento con el id: ${id}`);
      const changePerson = {
        name: selectedItem.name,
        number: selectedItem.number
      }
      const response = await personServices.update(id, changePerson)
      console.log(response);
      setPersons(response)
  }
  
  //CREAMOS UNA VARIABLE FILTER QUE ES QUIEN SE ENCARGARÁ DE FILTRAR NUESTROS DATOS
  const myFilter = filterName 
                  ? persons.filter( person => person.name.toLowerCase().startsWith(filterName.toLowerCase()))
                  : persons 

  return (
    <div className='bg-gray-900 text-white h-screen'>
      <div className='flex justify-between items-center bg-black h-14 mb-2 px-5'>
        <h2>Phonebook</h2>
        <Filter value={filterName} onChange={handleInputFilter} />
      </div>
      <div className='px-2'>
        <h3>Add new name</h3>
        <PersonForm onSubmit={addPerson} newName={newName}  handleInputName={handleInputName}
                      newNumber={newNumber} handleInputNumber={handleInputNumber}
                      titleButton={'Add'} />
        <h2>Numbers</h2>
          <Persons  
                  persons={myFilter} 
                  onDelete={toggleDeleteOf}
                  setIsOpen={showModal}/>
        {/*Open Modal*/}
        { isOpen && 
          <Modal setIsOpen={setIsOpen}>
            <PersonForm newName={selectedItem.name} newNumber={selectedItem.number} 
              titleButton={'Update'}
              handleInputName={(e)=>setSelectedItem({...selectedItem, name: e.target.value})}
              handleInputNumber={(e)=>setSelectedItem({...selectedItem, number: e.target.value})}
              onSubmit={() => handdleUpdate(selectedItem.id)}/>
          </Modal>
        }
      </div>
      </div>
  )
}

export default App