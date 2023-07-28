import PropTypes from "prop-types"
import { NavLink } from "react-router-dom"
import useUser from "../../hooks/useUser"
import LogoutButton from "../buttons/LogoutButton"
import "./menu.css"

function Menu({ children }) {
  const { logout } = useUser()

  return (
      <header className="menu">
          <nav >
              <ul>
                  {children}
              </ul>
          <LogoutButton handleClick={logout} />
          </nav>
      </header>
  )
}

function MenuItem({ goTo, children }) {
  return (
      <li className="menu__item" >
          <NavLink to={goTo}>{children}</NavLink>
      </li>
  )
}

Menu.displayName = "Menu"
Menu.propTypes = {
  children: PropTypes.array.isRequired
}

MenuItem.displayName = "MenuItem"
MenuItem.propTypes = {
  goTo: PropTypes.string.isRequired,
  children: PropTypes.array.isRequired
}

export default Menu
export { MenuItem }

