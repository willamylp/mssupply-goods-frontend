import apiConfig from '@/requests/apiConfig'

export async function getAllEntries(token: string) {
  const response = await fetch(`${apiConfig.apiUrl}goods_entries`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
  const data = await response.json()
  return data.entries
}
