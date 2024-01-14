import apiConfig from '../apiConfig'

export const createUser = async (user: any, token: string) => {
  await new Promise((resolve) => setTimeout(resolve, 500))
  const response = await fetch(`${apiConfig.apiUrl}users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(user),
  })
  const resp = await response.json()
  return resp
}
