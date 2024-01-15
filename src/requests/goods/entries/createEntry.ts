import apiConfig from '@/requests/apiConfig'

export const createEntry = async (entry: any, token: string) => {
  await new Promise((resolve) => setTimeout(resolve, 500))
  const response = await fetch(`${apiConfig.apiUrl}goods_entries`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(entry),
  })
  return await response.json()
}
