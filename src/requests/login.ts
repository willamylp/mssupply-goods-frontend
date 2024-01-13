import apiConfig from './apiConfig'

export const login = async (username: string, password: string) => {
  await new Promise((resolve) => setTimeout(resolve, 2000))
  const response = await fetch(`${apiConfig.apiUrl}login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      password,
    }),
  })
  const data = await response.json()
  return data
}
