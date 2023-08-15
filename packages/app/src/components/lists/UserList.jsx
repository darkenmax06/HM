import "./userList.css"


function UserList  ({children}) {
  return (
    <div className="user__list" >
      <ul className="schema" >
        <li>nombre</li>
        <li>apellido</li>
        <li>UserName</li>
        <li>fecha de creacion</li>
        <li>tipo</li>
        <li>acciones</li>
      </ul>
      <div>
        {children}
      </div>
    </div>
  )
}


export default UserList
