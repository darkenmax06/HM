import { errorValidate } from "../utils/errorValidate";
const URI = "http://localhost:3000/api/pacientes"

function search({ query, token }) {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  }

  return fetch(`${URI}/?hcn=${query}`, options)
    .then(errorValidate)
    .then(res => res)
}

function create({ data, token }) {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(data)
  }
  return fetch(URI, options)
    .then(errorValidate)
    .then(res => res)
}

function remove({ id, token }) {
  const options = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${token}`
    }
  }
  return fetch(`${URI}/${id}`, options)
    .then(errorValidate)
    .then(res => res)
}

export {
  create, search, remove
};

