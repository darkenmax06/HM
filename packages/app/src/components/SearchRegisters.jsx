import { X } from "lucide-react"
import { useState } from "react"


function SearchRegisters  ({searchRegisters}) {
  const [query,setQuery] = useState("")

  const handleChange = event =>{
    setQuery(event.target.value)
  }

  const handleSubmit = event =>{
    event.preventDefault()

    searchRegisters({query})
  }

  return (
    <form onSubmit={handleSubmit}>
      <input 
      type="text" 
      placeholder="ingrese el hcn del paciente"
      value={query}
      onChange={handleChange} />
      {query && 
      <>
      <i>
        <X/>
      </i>
      </>
      }
      <button>Buscar</button>
    </form>
  )
}

export default SearchRegisters