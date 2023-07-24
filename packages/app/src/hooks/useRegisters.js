import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { create, search } from '../services/registersServices'
import useUser from './useUser'

export default function useRegisters() {
  const { token, logout } = useUser()
  const [registers, setRegisters] = useState(null)
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

  console.log("token: " + token)


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

  // REFERENCIA
  // {
  //   "hcn": "juan",
  //   "referencia":"asdasd sa das as",
  //   "fechaDeIngreso": "11/6/2023",
  //   "ubicacion": "ch-0000-0000",
  //   "fechaDeRecibo": "12/6/2023",
  //   "patologia": "el paciente sufrio una lesion de la rodilla"
  // }

  const createRegister = ({ data }) => {
    if (data.hcn == "") return errorHandler("debes proveer el hcn para poder realizar esta accion")
    else if (data.referencia == "") return errorHandler("debes proveer el referencia para poder realizar esta accion")
    else if (data.fechaDeIngreso == "") return errorHandler("debes proveer el fechaDeIngreso para poder realizar esta accion")
    else if (data.ubicacion == "") return errorHandler("debes proveer el ubicacion para poder realizar esta accion")
    else if (!data.ubicacion.includes("-")) return errorHandler("debes pones un separador '-' entre cada conjunto de digitos, ej '123-123'")
    else if (data.fechaDeRecibo == "") return errorHandler("debes proveer el fechaDeRecibo para poder realizar esta accion")
    else if (data.patologia == "") return errorHandler("debes proveer el patologia para poder realizar esta accion")

    const ubicationData = data.ubicacion.value.split("-")
    const formatedUbication = ubicationData.map(value => {
      if (value.length < 4) return value.padStart(4, "0")
      return value
    })
    const ubicationResult = `CH-${formatedUbication[0]}-${formatedUbication[1]}`

    data.ubicacion = ubicationResult

    create({ data, token })
      .then(res => {
        console.log(res)
      }).catch(err => {
        if (err.loginAgain) {
          logout()
          navigate('/login')
        }
        errorHandler(err.error)
      })

  }

  return {
    searchRegisters,
    registers,
    error,
    createRegister
  }
}