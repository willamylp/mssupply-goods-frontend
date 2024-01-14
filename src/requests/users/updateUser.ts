import apiConfig from '../apiConfig'

export const updateUser = async (id: number, user: any, token: string) => {
  console.log(JSON.stringify(user))
  await new Promise((resolve) => setTimeout(resolve, 500))
  const response = await fetch(`${apiConfig.apiUrl}users/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(user),
  })
  const resp = await response.json()
  return resp
}
