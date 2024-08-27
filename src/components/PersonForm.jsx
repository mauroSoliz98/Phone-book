export const PersonForm = ({onSubmit, newName, handleInputName, newNumber, handleInputNumber, titleButton}) => {
  return (
    <form onSubmit={onSubmit} className="flex items-center gap-3">
        <div>
          name: <input value={newName}// ... fuerza al valor del input para que coincida con la variable de estado...
                       onChange={handleInputName}// ... y actualiza la variable de estado en cada edición!
                       className="text-black px-1"/>
        </div>
        <div>
          number: <input className="text-black px-1" value={newNumber} onChange={handleInputNumber}/>
        </div>
        <div>
          <button className="hover:bg-cyan-500 shadow-lg hover:shadow-cyan-500/50 rounded-sm p-2 bg-cyan-700" type="submit">{titleButton}</button>
        </div>
    </form>
  )
}
