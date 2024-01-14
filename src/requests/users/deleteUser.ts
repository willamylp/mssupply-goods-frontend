import apiConfig from '../apiConfig'

export async function deleteUser(token: string, id: string) {
  const response = await fetch(`${apiConfig.apiUrl}users/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
  const data = await response.json()
  console.log(data)
  return data
}
