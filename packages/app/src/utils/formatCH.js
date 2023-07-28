function formatCH (ubicacion){
  const formattedCh = ubicacion.split("-")
  const includesCh = formattedCh.includes("ch") || formattedCh.includes("CH")
  if (includesCh) formattedCh.shift()

  return formattedCh.join("-")
}

export {
  formatCH
}
