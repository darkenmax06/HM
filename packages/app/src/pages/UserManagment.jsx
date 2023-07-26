import { useEffect } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "../components/AdminLayout";
import useUsers from "../hooks/useUsers";

function UserManagment() {
  const {get, users,disable } = useUsers()
  document.title = "administrar usuarios..."

  useEffect(() => {
    get()
  }, [])

  const handleDisable = ({id,disabled})=>{
    const data = {id,disabled}
    console.log(data)
    disable({data})
  }


  //componer esto en otro componente
  // UserList
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
        {users?.length > 0 && users.map(user => ( //userItem
          <ul key={user.id}>
            <li >{user.id}</li>
            <li >{user.name}</li>
            <li >{user.lastName}</li>
            <li >{user.userName}</li>
            <li >{user.createAt}</li>
            <li >{user.type}</li>
            <button onClick={ ()=> handleDisable({id: user.id, disabled: !user.disable}) } > 
              {user.disable ? "habilitar": "desabilitar"} 
              </button>
            <Link to={`managment/${user.id}`} >cambia password</Link>
          </ul>
        ))}
      </div>
    </AdminLayout>
  )
}


export default UserManagment