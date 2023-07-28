import "./adminLayout.css";
import AdminMenu from "./menu/AdminMenu";

function AdminLayout({ children }) {
  return (
    <section>
      <AdminMenu />
      <div className="max" >
              <div className="container">
                {children}
              </div>
            </div>
    </section>
  )
}

export default AdminLayout;