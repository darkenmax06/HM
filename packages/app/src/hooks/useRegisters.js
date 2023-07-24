import {useState} from 'react'
import { search } from '../services/registersServices'
import useUser from './useUser'

export default function useRegisters() {
  const {token} = useUser()
  const [registers,setRegisters] = useState(null)
  const [error,setError] = useState(null)

  console.log(token)

  const searchRegisters = ({query}) =>{
    if (!query) setError("debes proveer el hcn del paciente para poder hacer la busqueda")
    search({query,token})
    .then(res => {
      setRegisters(res)
    })
  } 

  return {
    searchRegisters,
    registers,
    error
  }
}