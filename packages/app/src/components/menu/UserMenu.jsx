import Menu, { MenuItem } from "./menu";

function UserMenu() {
    return (
        <Menu>
            <MenuItem goTo="/search" >Buscar</MenuItem>
            <MenuItem goTo="/create" >Crear</MenuItem>
        </Menu>
    )
}

export default UserMenu;