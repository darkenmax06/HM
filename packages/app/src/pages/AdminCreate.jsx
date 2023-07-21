import useAdmin from "../hooks/useAdmin"
import useField from "../hooks/useField"



function AdminCreate() {
    const name = useField("ingrese su nombre")
    const lastName = useField("ingrese su apellido")
    const password = useField("ingrese su password", "password")
    const key = useField("ingrese la llave secreta")
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
        <section>
            <form onSubmit={handleSubmit} >
                <div className="inputs">
                    <input {...name} />
                    <input {...lastName} />
                    <input {...password} />
                    <input {...key} />
                </div>
                {error && <span>{error}</span>}
                <button>crear {loading && "Cargando ..."} </button>
            </form>
        </section>
    )
}


export default AdminCreate