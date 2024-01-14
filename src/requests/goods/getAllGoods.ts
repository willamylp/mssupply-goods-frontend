import apiConfig from '../apiConfig'

export async function getAllGoods(token: string) {
  const response = await fetch(`${apiConfig.apiUrl}goods`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
  const data = await response.json()
  console.log(data.goods)
  return data.goods
}
