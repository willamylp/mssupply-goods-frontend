import apiConfig from '@/requests/apiConfig'

export const updateEntry = async (id: number, entry: any, token: string) => {
  console.log('updateEntry', entry)
  await new Promise((resolve) => setTimeout(resolve, 500))
  const response = await fetch(`${apiConfig.apiUrl}goods_entries/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(entry),
  })
  const resp = await response.json()
  return resp
}
