import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import registersServices from '../services/registersServices'
import { formateUbication } from '../utils/formatCH'
import useError from './useError'
import useUser from './useUser'

//refactorizar lo de el formato de los registers

export default function useRegisters() {
  const { token, logout } = useUser()
  const [registers, setRegisters] = useState(null)
  const [register, setRegister] = useState(null)
  const [message,setMessage] = useState(null)
  const navigate = useNavigate()
  const [loading,setLoading] = useState(false)
  const {error, errorHandler} = useError()

  const searchRegisters = ({ query }) => {
    if (!query) return errorHandler("debes proveer el hcn del paciente para poder hacer la busqueda")
    registersServices.search({ query, token })
      .then(res => {
        setRegisters(res)
      }).catch(err => {
        if (err.loginAgain) {
          logout()
          navigate('/login')
        }
      })
  }

  const createRegister = ({ data }) => {
    if (data.hcn == "") return errorHandler({error: "debes proveer el hcn para poder realizar esta accion"})
    else if (data.referencia == "") return errorHandler({error: "debes proveer el referencia para poder realizar esta accion"})
    else if (data.fechaDeIngreso == "") return errorHandler({error: "debes proveer el fechaDeIngreso para poder realizar esta accion"})
    else if (data.ubicacion == "") return errorHandler({error: "debes proveer el ubicacion para poder realizar esta accion"})
    else if (!data.ubicacion.includes("-")) return errorHandler({error: "debes pones un separador '-' entre cada conjunto de digitos, ej '123-123'"})
    else if (data.fechaDeRecibo == "") return errorHandler({error: "debes proveer el fechaDeRecibo para poder realizar esta accion"})
    else if (data.patologia == "") return errorHandler({error: "debes proveer el patologia para poder realizar esta accion"})

    data.ubicacion = formateUbication(data.ubicacion)

    setLoading(true)
    registersServices.create({ data, token })
      .then(res => {
        setMessage(res.message)
      }).catch(err => {
        if (err.loginAgain) {
          logout()
          navigate('/login')
        }
        errorHandler({error: err.error})
      })
      .finally(()=> setLoading(false))

  }

  const removeRegister = ({id})=>{
    registersServices.remove({id,token})
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
    if (data.hcn == "") return errorHandler({error: "debes proveer el hcn para poder realizar esta accion"})
    else if (data.referencia == "") return errorHandler({error: "debes proveer el referencia para poder realizar esta accion"})
    else if (data.fechaDeIngreso == "") return errorHandler({error: "debes proveer el fechaDeIngreso para poder realizar esta accion"})
    else if (data.ubicacion == "") return errorHandler({error: "debes proveer el ubicacion para poder realizar esta accion"})
    else if (!data.ubicacion.includes("-")) return errorHandler({error: "debes pones un separador '-' entre cada conjunto de digitos, ej '123-123'"})
    else if (data.fechaDeRecibo == "") return errorHandler({error: "debes proveer el fechaDeRecibo para poder realizar esta accion"})
    else if (data.patologia == "") return errorHandler({error: "debes proveer el patologia para poder realizar esta accion"})

    data.ubicacion = formateUbication(data.ubicacion)

    setLoading(true)
    registersServices.update({ data, id, token })
      .then(res => {
        navigate("/search")
      }).catch(err => {
        if (err.loginAgain) {
          logout()
          navigate('/login')
        }
        errorHandler({error: err.error})
      })
      .finally(()=> setLoading(false))
      //hacer lo de los messages,en la api y la app

  }

  const findById = ({id}) =>{
    registersServices.getById({id,token})
    .then((res)=> {
      setRegister(res)
    }).catch(err => {
      if (err.loginAgain) {
        logout()
        navigate('/login')
      }
      errorHandler({error: err.error})
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
    loading,
    message
  }
}