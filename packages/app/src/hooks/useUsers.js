import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { changePassword, createUser, disableUser, getUsers } from "../services/userServices"
import useUser from './useUser'

export default function useUsers() {
  const {token, logout, user} = useUser()
  const [users,setUsers] = useState(null)
  const [error,setError] = useState(null)
  const [message,setMessage] = useState(null)
  const navigate = useNavigate()
  const timeOut = useRef()

  const errorHandler = (err) => {
    if (timeOut.current) {
      clearInterval(timeOut.current)
    }
    setError(err)
    timeOut.current = setTimeout(() => setError(null), 5000)
  }

  const get = () =>{
    getUsers({token})
    .then(res => {
      const filterUsers = res.filter(person=> person.id !== user.id)
      setUsers(filterUsers)
    }).catch(err => {
      if (err.loginAgain){
        logout()
        navigate("/login")
      }
      errorHandler(err.error)
    })
  }

  const disable = ({data}) => {
    disableUser({data,token})
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
      errorHandler(err.error)
    })
  }

  const create = ({data}) =>{
    if (data.name == "") return errorHandler("debes proveer un nombre para el usuario")
    else if (data.lastName == "") return errorHandler("debes proveer un apellido para el usuario")
    else if (data.password == "") return errorHandler("debes proveer una password para el usuario")
    else if (data.confirmPassword == "") return errorHandler("debes confirmar la password del usuario")
    else if (data.password !== data.confirmPassword) return errorHandler("las password no coinciden")

    createUser({data,token})
    .then(() => {
      setMessage("usuario creado")
    })
    .catch(err => {
      if (err.loginAgain){
        logout()
        navigate("/login")
      }
      errorHandler(err.error)
    })
  }

  const replacePassword = ({data})=> {
    if (data.password == "") return errorHandler("debes proveer una password para realizar esta accion")
    else if (data.confirmPassword == "") return errorHandler("debes confirmar la password para realizar esta accion")
    else if (data.confirmPassword !== data.password) return errorHandler("las password no coinciden")

    const {confirmPassword, ...restOfData} = data

    changePassword({data: restOfData, token})
    .then(res =>{
      setMessage(res.message)
    })
    .catch(err => {
      if (err.loginAgain){
        logout()
        navigate("/login")
      }
      errorHandler(err.error)
    })
  }

  const clearMessage = ()=>{
    setMessage(null)
  }
  
  return {
    get,
    create,
    users,
    error,
    message,
    disable,
    replacePassword,
    clearMessage
  }
}