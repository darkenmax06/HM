import { NavLink } from "react-router-dom"

function Menu({ children }) {
    return (
        <header className="menu">
            <nav>
                <ul>
                    {children}
                </ul>
            </nav>-
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

