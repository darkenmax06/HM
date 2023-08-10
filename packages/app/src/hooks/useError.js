import { useRef, useState } from "react";


// Este CUSTOM HOOK se encarga de manejar los errores de la app
function useError () {
  const [error,setError] = useState(null)
  const timeOut = useRef()

  const errorHandler = ({error, time = 5000}) => {
    if (timeOut.current != null){
      clearInterval(timeOut.current)
    }

    setError(error)
    const clearError = setTimeout(()=> setError(null) ,time)
    timeOut.current = clearError
  }

  return {
    errorHandler,
    error
  }
}

export default useError
