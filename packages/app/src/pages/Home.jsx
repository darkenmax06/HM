import SearchRegisters from "../components/SearchRegisters"
import useRegisters from "../hooks/useRegisters"

function Home() {
  const {searchRegisters} = useRegisters()

    return (
        <section>
            <h1>Registro</h1>
            <SearchRegisters searchRegisters={searchRegisters} />
        </section>
    )
}

export default Home