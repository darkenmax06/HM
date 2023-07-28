import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { create, getById, remove, search, update } from '../services/registersServices'
import useUser from './useUser'

//refactorizar lo de el formato de los registers

export default function useRegisters() {
  const { token, logout } = useUser()
  const [registers, setRegisters] = useState(null)
  const [register, setRegister] = useState(null)
  const [message,setMessage] = useState(null)
  const navigate = useNavigate()
  const [error, setError] = useState(null)
  const timeOut = useRef()

  const errorHandler = (err) => {
    console.log(error)
    if (timeOut.current) {
      clearInterval(timeOut.current)
    }
    setError(err)
    timeOut.current = setTimeout(() => setError(null), 5000)
  }

  const searchRegisters = ({ query }) => {
    if (!query) return errorHandler("debes proveer el hcn del paciente para poder hacer la busqueda")
    search({ query, token })
      .then(res => {
        console.log(res)
        setRegisters(res)
      }).catch(err => {
        console.log(err)
        if (err.loginAgain) {
          logout()
          navigate('/login')
        }
      })
  }

  const createRegister = ({ data }) => {
    if (data.hcn == "") return errorHandler("debes proveer el hcn para poder realizar esta accion")
    else if (data.referencia == "") return errorHandler("debes proveer el referencia para poder realizar esta accion")
    else if (data.fechaDeIngreso == "") return errorHandler("debes proveer el fechaDeIngreso para poder realizar esta accion")
    else if (data.ubicacion == "") return errorHandler("debes proveer el ubicacion para poder realizar esta accion")
    else if (!data.ubicacion.includes("-")) return errorHandler("debes pones un separador '-' entre cada conjunto de digitos, ej '123-123'")
    else if (data.fechaDeRecibo == "") return errorHandler("debes proveer el fechaDeRecibo para poder realizar esta accion")
    else if (data.patologia == "") return errorHandler("debes proveer el patologia para poder realizar esta accion")

    const ubicationData = data.ubicacion.split("-")
    const formatedUbication = ubicationData.map(value => {
      if (value.length < 4) return value.padStart(4, "0")
      return value
    })
    const ubicationResult = `CH-${formatedUbication[0]}-${formatedUbication[1]}`

    data.ubicacion = ubicationResult

    create({ data, token })
      .then(res => {
        setMessage(res.message)
      }).catch(err => {
        if (err.loginAgain) {
          logout()
          navigate('/login')
        }
        errorHandler(err.error)
      })

  }

  const removeRegister = ({id})=>{
    remove({id,token})
    .then(res => {
      alert("recurso eliminado de manera exitosa")
      const filtedRegisters = registers.filter(reg => reg.id !== id)
      setRegisters(filtedRegisters)
    })
    .catch(err=>{
      if (err.loginAgain) {
        logout()
        navigate('/login')
      }
      errorHandler(err.error)
    })
  }

  const updateRegister = ({ data , id}) => {
    if (data.hcn == "") return errorHandler("debes proveer el hcn para poder realizar esta accion")
    else if (data.referencia == "") return errorHandler("debes proveer el referencia para poder realizar esta accion")
    else if (data.fechaDeIngreso == "") return errorHandler("debes proveer el fechaDeIngreso para poder realizar esta accion")
    else if (data.ubicacion == "") return errorHandler("debes proveer el ubicacion para poder realizar esta accion")
    else if (!data.ubicacion.includes("-")) return errorHandler("debes pones un separador '-' entre cada conjunto de digitos, ej '123-123'")
    else if (data.fechaDeRecibo == "") return errorHandler("debes proveer el fechaDeRecibo para poder realizar esta accion")
    else if (data.patologia == "") return errorHandler("debes proveer el patologia para poder realizar esta accion")

    const ubicationData = data.ubicacion.split("-")
    const formatedUbication = ubicationData.map(value => {
      if (value.length < 4) return value.padStart(4, "0")
      return value
    })

    const ubicationResult = `CH-${formatedUbication[0]}-${formatedUbication[1]}`

    data.ubicacion = ubicationResult

    update({ data, id, token })
      .then(res => {
        console.log(res)
      }).catch(err => {
        if (err.loginAgain) {
          logout()
          navigate('/login')
        }
        errorHandler(err.error)
      })
      //hacer lo de los messages,en la api y la app

  }

  const findById = ({id}) =>{
    getById({id,token})
    .then((res)=> {
      setRegister(res)
    }).catch(err => {
      if (err.loginAgain) {
        logout()
        navigate('/login')
      }
      errorHandler(err.error)
    })
  }

  const cleanSearch = ()=>{
    setRegisters(null)
    setRegister(null)
  }

  const clearMessage =  ()=>{
    setMessage(null)
  }

  return {
    searchRegisters,
    createRegister,
    removeRegister,
    updateRegister,
    findById,
    clearMessage,
    cleanSearch,
    registers,
    error,
    register,
    message
  }
}