

function formatDate (fecha){
  const date = new Date(fecha)
  const year = date.getFullYear().toString().padStart(4,"0")
  const day =  date.getDate().toString().padStart(2,"0")
  const month = (date.getMonth() + 1).toString().padStart(2,"0")

  return `${day}/${month}/${year}`
}

function formatInputDate (fecha){
  const date = new Date(fecha)
  const year = date.getFullYear().toString().padStart(4,"0")
  const day =  date.getDate().toString().padStart(2,"0")
  const month = (date.getMonth() + 1).toString().padStart(2,"0")

  return `${year}-${month}-${day}`
}

export {
  formatDate,
  formatInputDate
}
