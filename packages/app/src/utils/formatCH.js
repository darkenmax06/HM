function formatCH (ubicacion){
  const formattedCH = ubicacion.split("-")
  const includesCh = formattedCH.includes("ch") || formattedCH.includes("CH")
  if (includesCh) formattedCH.shift()

  return formattedCH.join("-")
}

const formateUbication = (ubicacion) =>{
  const ubicationData = ubicacion.split("-")
  const formatedUbication = ubicationData.map(value => value.padStart(4, "0"))

  const ubicationResult = `CH-${formatedUbication[0]}-${formatedUbication[1]}`
  return ubicationResult
}

export {
  formatCH,
  formateUbication
}
