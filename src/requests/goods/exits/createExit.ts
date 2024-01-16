import apiConfig from '@/requests/apiConfig'

export const createExit = async (exit: any, token: string) => {
  await new Promise((resolve) => setTimeout(resolve, 500))
  const response = await fetch(`${apiConfig.apiUrl}goods_exits`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(exit),
  })
  return await response.json()
}
