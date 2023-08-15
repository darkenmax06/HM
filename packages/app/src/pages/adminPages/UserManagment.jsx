import { useEffect } from "react";
import AdminLayout from "../../components/AdminLayout";
import Loader from "../../components/alerts/Loader";
import UserList from "../../components/lists/UserList";
import UserItem from "../../components/lists/userItem";
import useUsers from "../../hooks/useUsers";
import "./userManagment.css";

function UserManagment() {
  const {getUsers, users, disableUser, loading } = useUsers()

  useEffect(() => {
    getUsers()
  }, [])

  const handleDisable = ({id,disabled})=>{
    const data = {id,disabled}
    console.log(data)
    disableUser({data})
  }


  //componer esto en otro componente
  // UserList
  return (
    <AdminLayout>
    <h1>Usuarios</h1>
    {loading && <Loader size={70} />}
    {!loading &&     
      <UserList>
        {users?.length > 0 && users.map(user => <UserItem key={user.id} handleDisable={handleDisable} {...user} />)}
      </UserList>
    }

    </AdminLayout>
  )
}




export default UserManagment