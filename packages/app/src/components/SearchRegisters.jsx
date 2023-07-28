import { X } from "lucide-react"
import PropTypes from "prop-types"
import { useState } from "react"
import SearchButton from "./buttons/SearchButton"
import "./searchRegister.css"

function SearchRegisters  ({searchRegisters, cleanSearch}) {
  const [query,setQuery] = useState("")

  const handleChange = event =>{
    setQuery(event.target.value)
  }

  const handleSubmit = event =>{
    event.preventDefault()
    searchRegisters({query})
  }

  const handleReset = ()=>{
    cleanSearch()
    setQuery("")
  }

  return (
    <form onSubmit={handleSubmit} className="search__register" >
      <input 
      type="text" 
      placeholder="ingrese el hcn del paciente"
      value={query}
      onChange={handleChange} />
      <div className="x" >
        {query && 
          <i onClick={handleReset} >
            <X/>
          </i>
        }
      </div>
      <SearchButton/>
    </form>
  )
}

SearchRegisters.propTypes = {
  searchRegisters: PropTypes.func.isRequired,
  cleanSearch: PropTypes.func.isRequired
}

export default SearchRegisters