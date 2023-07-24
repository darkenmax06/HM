import { createContext, useState } from "react";

const userContext = createContext()

function UserProvider({ children }) {
    const [user, setUser] = useState(() => {
        // const storage = window.sessionStorage.getItem("user")
        // return JSON.parse(storage)
        return null
    })

    const saveUser = (value) => {
        console.log(value)
        // sessionStorage.setItem('user', JSON.stringify(value))
        setUser(value)
    }

    const logout = () => {
      setUser(null)
  }
  

    return (
        <userContext.Provider value={{ saveUser, user, logout }} >
            {children}
        </userContext.Provider>
    )
}


export default UserProvider
export {
    userContext
}