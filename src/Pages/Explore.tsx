import { useEffect, useMemo, useState } from 'react'
import { Link, useLocation, useSearchParams } from 'react-router-dom'
import { getListings, type Listing } from '../api'

type Category = 'Stays' | 'Food' | 'Activities' | 'Nature' | 'Events'
type ExploreCategory = Category | 'All places'

const categories: Category[] = [
  'Stays',
  'Food',
  'Activities',
  'Nature',
  'Events',
]

const categoryPaths: Record<string, Category> = {
  '/stays': 'Stays',
  '/food': 'Food',
  '/activities': 'Activities',
  '/nature': 'Nature',
  '/events': 'Events',
}

function Explore() {
  const { pathname, search: locationSearch } = useLocation()
  const [searchParams] = useSearchParams()

  const pageCategory = categoryPaths[pathname]
  const [activeCategory, setActiveCategory] = useState<ExploreCategory>(
    (pageCategory || searchParams.get('category') || 'All places') as ExploreCategory,
  )
  const [search, setSearch] = useState(searchParams.get('q') || '')
  const [listings, setListings] = useState<Listing[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [retry, setRetry] = useState(0)

  useEffect(() => {
    const params = new URLSearchParams(locationSearch)
    setActiveCategory(
      (pageCategory || params.get('category') || 'All places') as ExploreCategory,
    )
    setSearch(params.get('q') || '')
  }, [locationSearch, pageCategory])

  useEffect(() => {
    let cancelled = false

    async function loadListings() {
      setLoading(true)
      setError('')

      try {
        const data = await getListings(activeCategory)
        if (!cancelled) setListings(data)
      } catch {
        if (!cancelled) {
          setError('Could not load listings. Check that the API server is running.')
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    loadListings()

    return () => {
      cancelled = true
    }
  }, [activeCategory, retry])

  const selectedId = searchParams.get('item')
  const selectedListing = listings.find((item) => item.slug === selectedId)

  const filteredListings = useMemo(() => {
    const query = search.trim().toLowerCase()

    if (!query) return listings

    return listings.filter((listing) =>
      [
        listing.name,
        listing.category,
        listing.kind,
        listing.location,
        listing.description,
        ...listing.details,
      ]
        .join(' ')
        .toLowerCase()
        .includes(query),
    )
  }, [listings, search])

  const listingPath = selectedListing
    ? `/${selectedListing.category.toLowerCase()}`
    : pageCategory
      ? `/${pageCategory.toLowerCase()}`
      : '/explore'

  if (selectedListing) {
    return (
      <main className="explore-page">
        <header className="site-header">
          <Link className="brand" to="/" aria-label="Kariba Explorer home">
            <span className="brand-mark">K</span>
            <span>
              Kariba <em>Explorer</em>
            </span>
          </Link>

          <nav className="main-nav" aria-label="Main navigation">
            <Link to="/">Home</Link>
            {categories.map((category) => (
              <Link key={category} to={`/${category.toLowerCase()}`}>
                {category}
              </Link>
            ))}
          </nav>
        </header>

        <section className="listing-detail">
          <Link className="detail-back" to={listingPath}>
            ← Back to {selectedListing.category.toLowerCase()}
          </Link>

          <div className="detail-content">
            <p className="detail-category">{selectedListing.kind}</p>
            <h1>{selectedListing.name}</h1>
            <p className="detail-location">{selectedListing.location}</p>
            <p className="detail-description">{selectedListing.description}</p>

            <h2>Details</h2>
            <ul className="detail-list">
              {selectedListing.details.map((detail) => (
                <li key={detail}>{detail}</li>
              ))}
            </ul>

            <p className="detail-notice">
              Contact the provider to confirm current services, prices, and
              availability.
            </p>

            <a
              className="button places-button"
              href={selectedListing.sourceUrl}
              target="_blank"
              rel="noreferrer"
            >
              View source: {selectedListing.source}
            </a>
          </div>
        </section>
      </main>
    )
  }

  const heading =
    activeCategory === 'All places' ? 'Explore Kariba' : activeCategory

  return (
    <main className="explore-page">
      <header className="site-header">
        <Link className="brand" to="/" aria-label="Kariba Explorer home">
          <span className="brand-mark">K</span>
          <span>
            Kariba <em>Explorer</em>
          </span>
        </Link>

        <nav className="main-nav" aria-label="Main navigation">
          <Link to="/">Home</Link>
          {categories.map((category) => (
            <Link
              key={category}
              to={`/${category.toLowerCase()}`}
              aria-current={pageCategory === category ? 'page' : undefined}
            >
              {category}
            </Link>
          ))}
        </nav>
      </header>

      <section className="explore-heading">
        <p className="eyebrow">Kariba, Zimbabwe</p>
        <h1>{heading}</h1>
        <p>
          Browse local listings and open a card for details and its source.
          Contact providers to confirm current information.
        </p>
      </section>

      <section className="explore-controls" aria-label="Search listings">
        <label className="explore-search">
          <span>Search listings</span>
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by name or place"
          />
        </label>

        {!pageCategory && (
          <div className="category-filters" aria-label="Filter by category">
            <button
              type="button"
              className={activeCategory === 'All places' ? 'filter-active' : ''}
              aria-pressed={activeCategory === 'All places'}
              onClick={() => setActiveCategory('All places')}
            >
              All places
            </button>

            {categories.map((category) => (
              <button
                key={category}
                type="button"
                className={activeCategory === category ? 'filter-active' : ''}
                aria-pressed={activeCategory === category}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        )}
      </section>

      <section className="explore-results" aria-live="polite">
        <div className="results-heading">
          <h2>{heading}</h2>
          {!loading && !error && (
            <span>{filteredListings.length} listings</span>
          )}
        </div>

        {loading ? (
          <p>Loading listings…</p>
        ) : error ? (
          <div className="explore-empty">
            <h3>Listings are unavailable</h3>
            <p>{error}</p>
            <button type="button" onClick={() => setRetry((value) => value + 1)}>
              Try again
            </button>
          </div>
        ) : filteredListings.length > 0 ? (
          <div className="listing-grid">
            {filteredListings.map((listing) => (
              <Link
                className="listing-card"
                to={`${listingPath}?item=${encodeURIComponent(listing.slug)}`}
                key={listing.slug}
              >
                <div
                  className={`listing-art listing-art-${listing.category.toLowerCase()}`}
                >
                  <span>{listing.category}</span>
                </div>

                <div className="listing-copy">
                  <p>{listing.kind}</p>
                  <h3>{listing.name}</h3>
                  <span>{listing.location}</span>
                  <span className="listing-more">View details →</span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="explore-empty">
            {activeCategory === 'Events' ? (
              <>
                <h3>No upcoming events verified</h3>
                <p>
                  Check the official calendar for newly announced events.
                </p>
                <a
                  href="https://www.visitkariba.com/events"
                  target="_blank"
                  rel="noreferrer"
                >
                  Visit the events calendar
                </a>
              </>
            ) : (
              <>
                <h3>No matching listings</h3>
                <p>Try another search term.</p>
                <button type="button" onClick={() => setSearch('')}>
                  Clear search
                </button>
              </>
            )}
          </div>
        )}
      </section>
    </main>
  )
}

export default Explore