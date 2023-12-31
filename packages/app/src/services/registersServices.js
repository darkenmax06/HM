import { errorValidate } from "../utils/errorValidate";
const URI = "/api/pacientes"

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
      "Authorization": `Bearer ${token}`
    }
  }
  return fetch(`${URI}/${id}`, options)
    .then(errorValidate)
    .then(res => res)
}

function update({ data, id, token }) {
  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(data)
  }
  return fetch(`${URI}/${id}`, options)
    .then(errorValidate)
    .then(res => res)
}

function getById({id, token}){
  const options = {
    method: 'GET',
    headers: {
      "Authorization": `Bearer ${token}`
    }
  }
  return fetch(`${URI}/${id}`, options)
    .then(errorValidate)
    .then(res => res)
}

function createSome ({data,token}){
  const options ={
    headers: {
      "content-type":"application/json",
      "authorization": `Bearer ${token}`
    },
    body: JSON.stringify(data),
    method: "POST"
  }

  return fetch(`${URI}/some`, options)
  .then(errorValidate)
  .then(res => res)
}

export default {
  create, getById, remove, search, update, createSome
};

