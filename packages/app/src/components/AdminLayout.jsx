import AdminMenu from "./menu/AdminMenu";

function AdminLayout({ children }) {
  return (
    <section>
      <AdminMenu />
      {children}
    </section>
  )
}

export default AdminLayout;