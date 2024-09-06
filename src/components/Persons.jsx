import DataTable from "react-data-table-component"

export const Persons = ({persons, onDelete, setIsOpen}) => {
  const columns = [
    {
      name: 'Name',
      selector: row => row.name,
    },
    {
      name: 'Number',
      selector: row => row.number
    },
    {
      name: 'Actions',
      cell: (row) => (
        <div className=" flex gap-3 text-white">
          <button className="hover:bg-blue-500 shadow-lg hover:shadow-blue-500/50 p-1 rounded-sm bg-blue-700" 
                onClick={()=> onDelete(row)}>
            Delete
        </button>
        <button className="hover:bg-indigo-500 shadow-lg hover:shadow-indigo-500/50 p-1 rounded-sm bg-indigo-700" 
                onClick={() => setIsOpen(row.id)}>
          Editar
        </button>
      </div>
      )
    },
  ];
  return (
    <div>
      <DataTable columns={columns} data={persons}/>
    </div>
          
  )
}
