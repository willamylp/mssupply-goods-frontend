import apiConfig from '../apiConfig'

export const getUser = async (token: string, id: string) => {
  await new Promise((resolve) => setTimeout(resolve, 2000))
  const response = await fetch(`${apiConfig.apiUrl}users/${id}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })
  const data = await response.json()
  return data.user
}
