const URI = "http://localhost:3000/api/pacientes"

function search({query}){
  return fetch(`${URI}/?hcn=${query}`)
  .then(async(res)=>{
    const json = await res.json()
    if (!res.ok) throw json
    return json
  })
  .then(res =>res)
}

export {
  search
}