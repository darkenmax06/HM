import InfoAlert from "../../components/InfoAlert"
import SearchRegisters from "../../components/SearchRegisters"
import UserLayout from "../../components/UserLayout"
import RegisterList, { RegisterItem } from "../../components/lists/RegisterList"
import useRegisters from "../../hooks/useRegisters"

function Home() {
  const {searchRegisters,registers,removeRegister, cleanSearch} = useRegisters()

  const handleDelete = ({id})=>{
    const confirm = window.confirm("estas seguro que desea eliminar este recurso?")
    if (!confirm) return 
    removeRegister({id})
  }

    return (
      <UserLayout>
        <h1>Registro</h1>
        <SearchRegisters searchRegisters={searchRegisters} cleanSearch={cleanSearch} />
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

          {registers?.length < 1 && <InfoAlert info={"no se han encotrado resultados"} /> }
      </UserLayout>
    )
}

export default Home
