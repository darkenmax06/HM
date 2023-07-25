import SearchRegisters from "../components/SearchRegisters"
import UserLayout from "../components/UserLayout"
import RegisterList, { RegisterItem } from "../components/registerList/RegisterList"
import useRegisters from "../hooks/useRegisters"

function Home() {
  const {searchRegisters,registers,removeRegister} = useRegisters()
  document.title = "Search"

  const handleDelete = ({id})=>{
    const confirm = window.confirm("esta seguro que decea eliminar este recurso?")
    if (!confirm) return 
    removeRegister({id})
  }

    return (
      <UserLayout>
        <h1>Registro</h1>
        <SearchRegisters searchRegisters={searchRegisters} />
          {registers?.length > 0 && 
            <RegisterList >
                {
                  registers.map(res => <RegisterItem
                    key={res.id} 
                    {...res} 
                    usuario={res.usuario.userName}
                    handleDelete={handleDelete}
                    /> )
                }
            </RegisterList>
          }
      </UserLayout>
    )
}

export default Home
