import { useEffect, useState } from "react";
import AdminLayout from "../components/AdminLayout";
import useUser from "../hooks/useUser";
import { errorValidate } from "../utils/errorValidate";



function UserManagment() {
  const { token } = useUser()
  const [users, setUsers] = useState(null)
  document.title = "administrar usuarios..."

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${token}`
      }
    }

    fetch("http://localhost:3000/api/users", options)
      .then(errorValidate)
      .then(res => {
        console.log(res)
        setUsers(res)
      })
      .catch(err => {
        console.log(err)
      })
  }, [token])

  console.log("----- users -----")
  console.log(users)

  return (
    <AdminLayout>
      <h1>users</h1>
      <ul>
        <li>id</li>
        <li>nombre</li>
        <li>apellido</li>
        <li>UserName</li>
        <li>fecha de creacion</li>
        <li>tipo</li>
        <li>acciones</li>
      </ul>
      <div>
        {users?.length > 0 && users.map(user => (
          <ul key={user.id}>
            <li >{user.id}</li>
            <li >{user.name}</li>
            <li >{user.lastName}</li>
            <li >{user.userName}</li>
            <li >{user.createAt}</li>
            <li >{user.type}</li>
            <button>eliminar</button>
            <button>editar</button>
          </ul>
        ))}
      </div>
    </AdminLayout>
  )
}


export default UserManagment