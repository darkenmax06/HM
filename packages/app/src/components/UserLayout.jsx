import UserMenu from "./menu/UserMenu";


function UserLayout({ children }) {
    return (
        <section>
            <UserMenu />
            {children}
        </section>
    )
}

export default UserLayout;