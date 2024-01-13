import apiConfig from '../apiConfig'

export async function deleteUser(id: string, token: string) {
  const response = await fetch(`${apiConfig.apiUrl}users/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
  const data = await response.json()
  return data
}
