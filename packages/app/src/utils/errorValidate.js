

export async function errorValidate(res) {
  const json = await res.json()
  if (!res.ok) throw json
  return json
}