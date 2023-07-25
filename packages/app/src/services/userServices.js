import { errorValidate } from "../utils/errorValidate"

function getUser({ token }) {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'authorization': `Bearer ${token}`
    }
  }

  return fetch("http://localhost:3000/api/users", options)
    .then(errorValidate)
    .then(res => res)
}


export { getUser }

