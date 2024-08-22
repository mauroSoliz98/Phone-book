export const Persons = ({myFilter}) => {
  return (
    <ul>
        {
        myFilter.map((person,i) => {
            return(
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 5, margin:5}}>
                <li>{person.name} {person.number}</li>
                <button> Delete </button>
              </div>
            )
        })
        }
    </ul>
  )
}
