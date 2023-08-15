import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import userServices from '../services/userServices'
import useError from './useError'
import useUser from './useUser'

// este es useUsers
// este se encarga de la gestion de los usuarios
// osea, rol de administrador

export default function useUsers() {
  const {token, logout, user} = useUser()
  const [users,setUsers] = useState(null)
  const [message,setMessage] = useState(null)
  const [loading,setLoading] = useState(false)
  const {error,errorHandler} = useError()
  const navigate = useNavigate()

  const getUsers = () =>{
    setLoading(true)
    
    userServices.getAll({token})
    .then(res => {
      const filterUsers = res.filter(person=> person.id !== user.id)
      setUsers(filterUsers)
    }).catch(err => {
      if (err.loginAgain){
        logout()
        navigate("/login")
      }
      errorHandler({error: err.error})
    })
    .finally(()=> setLoading(false))
  }

  const disableUser = ({data}) => {
    userServices.disable({data,token})
    .then(res => {
      const userChanged = users.map(person =>{

        if (person.id == data.id ) {
          return {
            ...person,
            disable: data.disabled
          }
        }
        return person
      } )

      setMessage(res.message)
      setUsers(userChanged)
    }).catch(err => {
      if (err.loginAgain){
        logout()
        navigate("/login")
      }
      errorHandler({error: err.error})
    })
  }

  const createUser = ({data}) =>{
    if (data.name == "") return errorHandler({error: "debes proveer un nombre para el usuario"})
    else if (data.lastName == "") return errorHandler({error: "debes proveer un apellido para el usuario"})
    else if (data.password == "") return errorHandler({error: "debes proveer una password para el usuario"})
    else if (data.userName == "") return errorHandler({error: "debes proveer una password para el usuario"})
    else if (data.confirmPassword == "") return errorHandler({error: "debes confirmar la password del usuario"})
    else if (data.password !== data.confirmPassword) return errorHandler({error: "las password no coinciden"})

    setLoading(true)
    userServices.create({data,token})
    .then(() => {
      setMessage("usuario creado")
    })
    .catch(err => {
      if (err.loginAgain){
        logout()
        navigate("/login")
      }
      errorHandler({error: err.error})
    })
    .finally(()=> setLoading(false))
  }

  const changePassowrd = ({data})=> {
    if (data.password == "") return errorHandler({error: "debes proveer una password para realizar esta accion"})
    else if (data.confirmPassword == "") return errorHandler({error: "debes confirmar la password para realizar esta accion"})
    else if (data.confirmPassword !== data.password) return errorHandler({error: "las password no coinciden"})

    const {confirmPassword, ...restOfData} = data

    setLoading(true)
    userServices.updatePassword({data: restOfData, token})
    .then(res =>{
      setMessage(res.message)
    })
    .catch(err => {
      if (err.loginAgain){
        logout()
        navigate("/login")
      }
      errorHandler({error: err.error})
    })
    .finally(()=> setLoading(false))
  }

  const clearMessage = ()=>{
    setMessage(null)
  }
  
  return {
    getUsers,
    createUser,
    users,
    error,
    message,
    loading,
    disableUser,
    changePassowrd,
    clearMessage
  }
}