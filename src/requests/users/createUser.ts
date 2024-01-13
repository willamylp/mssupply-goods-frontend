import apiConfig from '../apiConfig'

export const createUser = async (user: User) => {
  const response = await fetch(`${apiConfig.apiUrl}users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  })

  return response.json()
}