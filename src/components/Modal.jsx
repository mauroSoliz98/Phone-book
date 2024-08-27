export const Modal = ({setIsOpen, children}) => {
  return (
    <div className="fixed inset-0 bg-black opacity-80 backdrop-blur-sm flex justify-center items-center">
        <div className="bg-gray-800 p-5 rounded flex flex-col justify-center items-end gap-5">
            <button onClick={()=>{setIsOpen(false)}} className="font-bold text-xl">X</button>
            {children}
        </div>
    </div>
  )
}
