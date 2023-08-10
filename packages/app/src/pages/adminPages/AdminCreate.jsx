import InputError from "../../components/InputError"
import MakeAction from "../../components/buttons/MakeAction"
import useAdmin from "../../hooks/useAdmin"
import useField from "../../hooks/useField"
import "./adminCreate.css"


function AdminCreate() {
    const [name] = useField({placeholder: "ingrese su nombre"})
    const [lastName] = useField({placeholder: "ingrese su apellido"})
    const [userName] = useField({placeholder: "ingrese un userName"})
    const [password] = useField({placeholder: "ingrese su password", type: "password"})
    const [key] = useField({placeholder: "ingrese la llave secreta", type: "password"})
    const { loading, error, createAdmin } = useAdmin()

    const handleSubmit = (event) => {
        event.preventDefault()

        const adminToSend = {
            name: name.value.trim(),
            lastName: lastName.value.trim(),
            userName: userName.value.trim(),
            password: password.value.trim(),
            key: key.value.trim()
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
              <input {...userName} />
              <input {...password} />
              <input {...key} />
            </div>
            {error && <InputError error={error} /> }
            <MakeAction title="Crear" />
            </form>
        </section>
    )
}


export default AdminCreate