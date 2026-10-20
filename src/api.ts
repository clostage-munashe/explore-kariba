export type Listing = {
  slug: string
  name: string
  category: string
  kind: string
  location: string
  description: string
  details: string[]
  source: string
  sourceUrl: string
  published: boolean
}

export async function getListings(category: string): Promise<Listing[]> {
  const params = new URLSearchParams()

  if (category !== 'All places') {
    params.set('category', category)
  }

  const query = params.toString()
  const url = `http://localhost:5000/api/listings${query ? `?${query}` : ''}`

  const response = await fetch(url)

  if (!response.ok) {
    throw new Error('Could not load listings from the server.')
  }

  return response.json() as Promise<Listing[]>
}
