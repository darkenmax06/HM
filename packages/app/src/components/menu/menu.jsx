import { NavLink } from "react-router-dom"
import useUser from "../../hooks/useUser"

function Menu({ children }) {
    const { logout } = useUser()

    return (
        <header className="menu">
            <nav>
                <ul>
                    {children}
                </ul>
            </nav>
            <button onClick={logout} >cerrar sesion</button>
        </header>
    )
}

function MenuItem({ goTo, children }) {
    return (
        <li>
            <NavLink to={goTo}>{children}</NavLink>
        </li>
    )
}

export default Menu
export { MenuItem }

