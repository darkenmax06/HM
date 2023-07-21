import { useState } from "react"


function useField(placeholder, type = "text") {
    const [value, setValue] = useState("")

    const onChange = ({ target: { value } }) => setValue(value)

    return {
        value,
        onChange,
        type,
        placeholder
    }
}







export default useField