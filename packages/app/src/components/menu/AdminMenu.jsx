import Menu, { MenuItem } from "./menu";

import { UserCheck, UserPlus } from "lucide-react";

function AdminMenu() {

  return (
    <Menu>
      <MenuItem goTo="/managment" > <UserCheck /> Gestionar Usuarios</MenuItem>
      <MenuItem goTo="/create/user" > <UserPlus /> Crear Usuario</MenuItem>

    </Menu>
  )
}

export default AdminMenu;