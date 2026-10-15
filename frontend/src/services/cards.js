
import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/cards'

// hakee kaikki kortit
const getAll = () => {
  return axios.get(baseUrl)
}

// lisää uuden kortin
const create = (newCard) => {
  return axios.post(baseUrl, newCard)
}

// poistaa kortin
const remove = (id) => {
  return axios.delete(`${baseUrl}/${id}`)
}

export default { getAll, create, remove }
