import apiConfig from '../apiConfig'

export const createMerchandise = async (merchandise: any, token: string) => {
  await new Promise((resolve) => setTimeout(resolve, 500))
  const response = await fetch(`${apiConfig.apiUrl}goods`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(merchandise),
  })
  const resp = await response.json()
  return resp
}
