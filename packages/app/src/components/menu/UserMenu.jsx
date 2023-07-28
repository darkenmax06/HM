import { FilePlus, Search } from "lucide-react";
import Menu, { MenuItem } from "./menu";

function UserMenu() {
    return (
        <Menu>
            <MenuItem goTo="/search" >Buscar <Search/> </MenuItem>
            <MenuItem goTo="/create/registers" >Crear <FilePlus/> </MenuItem>
        </Menu>
    )
}

export default UserMenu;