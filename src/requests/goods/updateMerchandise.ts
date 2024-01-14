import apiConfig from '../apiConfig'

export const updateMerchandise = async (
  id: number,
  merchandise: any,
  token: string,
) => {
  await new Promise((resolve) => setTimeout(resolve, 500))
  const response = await fetch(`${apiConfig.apiUrl}goods/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(merchandise),
  })
  const resp = await response.json()
  return resp
}
