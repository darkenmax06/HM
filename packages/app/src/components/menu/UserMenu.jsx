import { FilePlus, Files, Search } from "lucide-react";
import Menu, { MenuItem } from "./menu";

function UserMenu() {
    return (
        <Menu>
            <MenuItem goTo="/search" >Buscar <Search/> </MenuItem>
            <MenuItem goTo="/create/registers" >Crear <FilePlus/> </MenuItem>
            <MenuItem goTo="/create/registers/upfile" >subir lote <Files/> </MenuItem>
        </Menu>
    )
}

export default UserMenu;