import { useEffect } from "react"
import { useParams } from "react-router-dom"
import UserLayout from "../components/UserLayout"
import RegisterForm from "../components/forms/RegisterForm"
import useRegisters from "../hooks/useRegisters"

function UpdateRegister  () {
  const {id} = useParams()
  const {findById, register} = useRegisters()

  useEffect(()=>{
    findById({id})
  },[id])

  return (
    <UserLayout>
      {register && <RegisterForm title="actualizar" {...register} />}
    </UserLayout>
  )
}

export default UpdateRegister