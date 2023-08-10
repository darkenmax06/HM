import { useEffect } from "react";
import AdminLayout from "../../components/AdminLayout";
import useUsers from "../../hooks/useUsers";
import "./userManagment.css";

import UserList, { UserItem } from "../../components/lists/UserList";

function UserManagment() {
  const {get, users, disable } = useUsers()

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
    <h1>Usuarios</h1>
      <UserList>
      {users?.length > 0 && users.map(user => <UserItem key={user.id} handleDisable={handleDisable} {...user} />)}
      </UserList>
    </AdminLayout>
  )
}




export default UserManagment