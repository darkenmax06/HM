import UserMenu from "./menu/UserMenu";
import "./userLayout.css";

function UserLayout({ children }) {
    return (
        <section>
            <UserMenu />
            <div className="max" >
              <div className="container">
                {children}
              </div>
            </div>
        </section>
    )
}

export default UserLayout;