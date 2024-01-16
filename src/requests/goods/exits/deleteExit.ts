import apiConfig from '@/requests/apiConfig'

export async function deleteExit(token: string, id: string) {
  const response = await fetch(`${apiConfig.apiUrl}goods_exits/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
  const data = await response.json()
  return data
}
