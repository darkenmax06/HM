import { errorValidate } from "../utils/errorValidate"
const URI = "/api/users"

function getAll({ token }) {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'authorization': `Bearer ${token}`
    }
  }

  return fetch(URI, options)
    .then(errorValidate)
    .then(res => res)
}

function create ({data,token}) {
  const options = {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(data)
  }

  return fetch(URI,options)
    .then(errorValidate)
    .then(res => res)
}

function disable ({data,token}){

  const options = {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(data)
  }

  return fetch(`${URI}/disable`,options)
    .then(errorValidate)
    .then(res => res)
}

function updatePassword ({data,token}){
  const options = {
    method:  "PUT",
    headers:{
      "Content-type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(data)
  }

  return fetch(`${URI}/password`,options)
    .then(errorValidate)
    .then(res => res)
}


export default{
  updatePassword,
  create,
  disable,
  getAll
}

