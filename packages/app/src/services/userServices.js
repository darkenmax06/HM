import { errorValidate } from "../utils/errorValidate"

const URI = "http://localhost:3000/api/users"

function getUsers({ token }) {
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

function createUser ({data,token}) {
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

function disableUser ({data,token}){

  console.log("data", data)
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

function changePassword ({data,token}){
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


export {
  changePassword,
  createUser,
  disableUser,
  getUsers
}

