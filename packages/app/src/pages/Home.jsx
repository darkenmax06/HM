import SearchRegisters from "../components/SearchRegisters"
import UserLayout from "../components/UserLayout"
import useRegisters from "../hooks/useRegisters"

function Home() {
    const { searchRegisters } = useRegisters()

    return (
        <UserLayout>
            <h1>Registro</h1>
            <SearchRegisters searchRegisters={searchRegisters} />
        </UserLayout>
    )
}

export default Home