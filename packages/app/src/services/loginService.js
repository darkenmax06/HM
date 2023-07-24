const URI = "http://localhost:3000/api/login"

function loginUser ({userInfo}){
  const options = {
    method: "POST",
    headers: {"content-type": "application/json"},
    body: JSON.stringify(userInfo)
  }

  return fetch(URI,options)
  .then(async (res)=>{
    const json = await res.json()
      if (!res.ok) throw json.error
      return json
  })
  .then(res => res)
}

export {
  loginUser
}