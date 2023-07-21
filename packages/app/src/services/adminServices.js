const URI = "/api/admin"

function create({ admin }) {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(admin)
    }

    return fetch(URI, options)
        .then(async (res) => {
            const json = await res.json()
            if (!res.ok) throw json
            return json
        })
        .then(res => res)
}



export {
    create
}