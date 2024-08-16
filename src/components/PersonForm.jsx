export const PersonForm = ({addPerson, newName, handleInputName, newNumber, handleInputNumber}) => {
  return (
    <form onSubmit={addPerson}>
        <div>
          name: <input value={newName}// ... fuerza al valor del input para que coincida con la variable de estado...
                       onChange={handleInputName}// ... y actualiza la variable de estado en cada edición!
                />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleInputNumber}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
    </form>
  )
}
