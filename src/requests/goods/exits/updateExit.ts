import apiConfig from '@/requests/apiConfig'

export const updateExit = async (id: number, exit: any, token: string) => {
  await new Promise((resolve) => setTimeout(resolve, 500))
  const response = await fetch(`${apiConfig.apiUrl}goods_exits/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(exit),
  })
  const resp = await response.json()
  return resp
}
