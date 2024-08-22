export const Persons = ({person, onDelete}) => {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 5, margin:5}}>
      <li>{person.name} {person.number}</li>
      <button onClick={onDelete}>Delete</button>
    </div>
          
  )
}
