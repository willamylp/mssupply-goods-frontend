import apiConfig from '../apiConfig'

export async function getAllUsers(token: string) {
  const response = await fetch(`${apiConfig.apiUrl}users`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
  const data = await response.json()
  return data
}
