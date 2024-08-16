export const Persons = ({myFilter}) => {
  return (
    <ul>
        {
        myFilter.map((person,i) => {
            return(<li key={i}>{person.name} {person.number}</li>)
        })
        }
    </ul>
  )
}
