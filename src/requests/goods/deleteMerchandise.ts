import apiConfig from '../apiConfig'

export async function deleteMerchandise(token: string, id: string) {
  const response = await fetch(`${apiConfig.apiUrl}goods/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
  const data = await response.json()
  return data
}
