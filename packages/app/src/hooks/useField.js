import { useState } from "react"


function useField({placeholder, initialValue = "",type = "text"}) {
    const [value, setValue] = useState(initialValue)

    const onChange = ({ target: { value } }) => setValue(value)

    const reset = ()=> setValue("")

    const object = {
      value,
      onChange,
      type,
      placeholder
  }

    return [object,reset]
}







export default useField