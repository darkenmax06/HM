import MakeAction from "../../components/buttons/MakeAction"
import useAdmin from "../../hooks/useAdmin"
import useField from "../../hooks/useField"
import "./adminCreate.css"


function AdminCreate() {
    const [name] = useField({placeholder: "ingrese su nombre"})
    const [lastName] = useField({placeholder: "ingrese su apellido"})
    const [password] = useField({placeholder: "ingrese su password", type: "password"})
    const [key] = useField({placeholder: "ingrese la llave secreta", type: "password"})
    const { loading, error, createAdmin } = useAdmin()

    const handleSubmit = (event) => {
        event.preventDefault()

        const adminToSend = {
            name: name.value,
            lastName: lastName.value,
            password: password.value,
            key: key.value
        }

        createAdmin(adminToSend)
    }

    return (
      <section className="admin__create"  >
        <form onSubmit={handleSubmit} >
          <h2>Crear Administrador</h2>
            <div className="inputs">
              <input {...name} />
              <input {...lastName} />
              <input {...password} />
              <input {...key} />
            </div>
            {error && <span>{error}</span>}
            <MakeAction title="Crear" />
            </form>
        </section>
    )
}


export default AdminCreate