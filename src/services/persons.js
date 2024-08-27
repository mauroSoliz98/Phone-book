import axios from 'axios'
const baseUrl = 'http://localhost:3004/persons'

const getAll = async() => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (newObject) => {
  const response = await axios.post(baseUrl, newObject)
  return response.data
}

// use some other name for variable!
const deleteObj = async(id) => {
    const response = await axios.delete(`${baseUrl}/${id}`)
    return response.data
}

const update = async(id, newObject) => {
  const response = await axios.put(`${baseUrl}/${id}`, newObject)
  return response.data
}

export default { 
  getAll: getAll, 
  create: create, 
  update: update,
  deleteObj: deleteObj, 
}