export const Persons = ({person, onDelete, setIsOpen}) => {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom:10}}>
      <li>{person.name} {person.number}</li>
      <button className="hover:bg-blue-500 shadow-lg hover:shadow-blue-500/50 p-1 rounded-sm bg-blue-700" 
              onClick={onDelete}>
        Delete
      </button>
      <button className="hover:bg-indigo-500 shadow-lg hover:shadow-indigo-500/50 p-1 rounded-sm bg-indigo-700" 
              onClick={setIsOpen}>
        Editar
      </button>
    </div>
          
  )
}
