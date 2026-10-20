import { useState, type FormEvent } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import Explore from './Pages/Explore'
import './App.css'

const karibaPhoto = '/images.jpg'

const searchCategories = [
  'All places',
  'Stays',
  'Food',
  'Activities',
  'Nature',
  'Events',
]

const featuredStays = [
  { name: 'Lakeside stay', type: 'Lodge-style', art: 'stay-art-one' },
  { name: 'Garden retreat', type: 'Resort-style', art: 'stay-art-two' },
  { name: 'Quiet shore escape', type: 'Guesthouse-style', art: 'stay-art-three' },
  { name: 'A night on the water', type: 'Houseboat-style', art: 'stay-art-four' },
]

const experiences = [
  { name: 'Boat cruises', art: 'experience-boat', description: 'Time out on the water' },
  { name: 'Fishing trips', art: 'experience-fishing', description: 'A day by the lake' },
  { name: 'Wildlife experiences', art: 'experience-wildlife', description: 'Discover the natural surroundings' },
  { name: 'Water sports', art: 'experience-sports', description: 'Get out on the water' },
  { name: 'Scenic tours', art: 'experience-scenic', description: 'See Kariba from a new angle' },
  { name: 'Sunset experiences', art: 'experience-sunset', description: 'Watch the light change over the lake' },
]

const diningPlaces = [
  { name: 'Lakeside dining', type: 'Sample restaurant', art: 'dining-lakeside' },
  { name: 'A cafe by the water', type: 'Sample cafe', art: 'dining-cafe' },
  { name: 'Local flavours', type: 'Sample dining experience', art: 'dining-local' },
  { name: 'Dinner at sunset', type: 'Sample restaurant', art: 'dining-sunset' },
]

const sampleEvents = [
  { name: 'Sunset on the lake', art: 'event-sunset' },
  { name: 'Fishing day example', art: 'event-fishing' },
  { name: 'Community music night', art: 'event-music' },
  { name: 'Wildlife outing example', art: 'event-wildlife' },
]

const karibaPlaces = [
  { name: 'Kariba Dam area', type: 'Landmark', art: 'place-dam', category: 'Nature' },
  { name: 'Matusadona region', type: 'Nature', art: 'place-matusadona', category: 'Nature' },
  { name: 'Lake shoreline', type: 'Lakeside', art: 'place-shore', category: 'Nature' },
  { name: 'Houseboat journeys', type: 'On the water', art: 'place-houseboat', category: 'Activities' },
]

function HomeSearch() {
  const [category, setCategory] = useState('All places')
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const routes: Record<string, string> = {
      'All places': '/explore',
      Stays: '/stays',
      Food: '/food',
      Activities: '/activities',
      Nature: '/nature',
      Events: '/events',
    }

    const searchText = query
    const queryString = new URLSearchParams({ q: searchText }).toString()
    navigate(`${routes[category]}?${queryString}`)
  }

  return (
    <section className="home-search" aria-label="Search Kariba">
      <div className="search-tabs" aria-label="Choose a category">
        {searchCategories.map((item) => (
          <button
            key={item}
            type="button"
            className={
              category === item
                ? 'search-tab search-tab-active'
                : 'search-tab'
            }
            aria-pressed={category === item}
            onClick={() => setCategory(item)}
          >
            {item}
          </button>
        ))}
      </div>

      <form className="search-form" onSubmit={handleSubmit}>
        <label className="search-location">
          <span>Where are you going?</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Try â€œlakeâ€ or â€œfoodâ€"
          />
        </label>

        <button className="search-submit" type="submit">
          <span aria-hidden="true">âŒ•</span>
          Search
        </button>
      </form>
    </section>
  )
}

function Newsletter() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setMessage('Thanks! This demo does not send emails yet.')
    setEmail('')
  }

  return (
    <section className="newsletter" id="newsletter">
      <div className="newsletter-copy">
        <p className="eyebrow light">Stay in the loop</p>
        <h2>Get the latest updates</h2>
        <p>Travel ideas, event news, and Kariba inspiration in one place.</p>
      </div>

      <form className="newsletter-form" onSubmit={handleSubmit}>
        <label className="sr-only" htmlFor="newsletter-email">
          Your email address
        </label>
        <input
          id="newsletter-email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Enter your email address"
          required
        />
        <button type="submit">Subscribe</button>
        <span className="newsletter-note" aria-live="polite">
          {message || 'Demo only â€” no email will be sent.'}
        </span>
      </form>
    </section>
  )
}

function App() {
  const { pathname } = useLocation()

  const categoryPaths = [
    '/stays',
    '/food',
    '/activities',
    '/nature',
    '/events',
  ]

  if (pathname === '/explore' || categoryPaths.includes(pathname)) {
    return <Explore key={pathname} />
  }

  return (
    <main id="top">
      <header className="site-header">
        <Link className="brand" to="/" aria-label="Kariba Explorer home">
          <span className="brand-mark">K</span>
          <span>Kariba <em>Explorer</em></span>
        </Link>

        <nav className="main-nav" aria-label="Main navigation">
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/stays">Stays</NavLink>
          <NavLink to="/food">Food</NavLink>
          <NavLink to="/activities">Activities</NavLink>
          <NavLink to="/nature">Nature</NavLink>
          <NavLink to="/events">Events</NavLink>
        </nav>

        <a className="header-link" href="#discover">
          Start exploring <span aria-hidden="true">â†—</span>
        </a>
      </header>

      <section className="hero">
        <img
          className="hero-image"
          src={karibaPhoto}
          alt="Sunset over Kariba Dam"
        />
        <div className="hero-shade" />

        <div className="hero-content">
          <p className="eyebrow light">Zimbabwe Â· Southern Africa</p>
          <h1>
            Discover Kariba
            <br />
            Experience More.
          </h1>
          <p className="hero-copy">
            Wide-open water, golden sunsets, and a little more room to breathe.
            Your Kariba story starts here.
          </p>
          <a className="button button-light" href="#discover">
            Explore Kariba <span aria-hidden="true">â†’</span>
          </a>
        </div>

        <div className="hero-note">
          <span className="note-dot" />
          <span>Made for the moments that stay with you</span>
        </div>

        <a
          className="photo-credit"
          href="https://commons.wikimedia.org/wiki/File:Sunset_over_Kariba_Dam.jpg"
          target="_blank"
          rel="noreferrer"
        >
          Photo: Tmasvaure Â· CC BY-SA 4.0
        </a>
      </section>

      <HomeSearch />

      <section className="intro" id="discover">
        <div>
          <p className="eyebrow">A lake with a different rhythm</p>
          <h2>
            Come for the water.
            <br />
            <em>Stay for the feeling.</em>
          </h2>
        </div>
        <p className="intro-copy">
          From quiet mornings on the shore to evenings under a sky full of
          colour, discover places and experiences that make Kariba unforgettable.
        </p>
      </section>

      <section className="discovery-grid" aria-label="Explore Kariba">
        <a className="discovery-card card-stays" id="stays" href="#featured-stays">
          <span className="card-number">01 / REST</span>
          <span className="card-title">Places to stay</span>
          <span className="card-arrow" aria-hidden="true">â†—</span>
        </a>

        <a className="discovery-card card-lake" href="#popular-experiences">
          <span className="card-number">02 / WANDER</span>
          <span className="card-title">Out on the lake</span>
          <span className="card-arrow" aria-hidden="true">â†—</span>
        </a>

        <a className="discovery-card card-town" href="#dining">
          <span className="card-number">03 / TASTE</span>
          <span className="card-title">The local side</span>
          <span className="card-arrow" aria-hidden="true">â†—</span>
        </a>
      </section>

      <section className="featured-stays" id="featured-stays">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Featured accommodation</p>
            <h2>Places to stay in Kariba</h2>
            <p>Find a base for slow mornings and days out on the lake.</p>
          </div>

          <Link className="section-action" to="/explore?category=Stays">
            View all stays <span aria-hidden="true">â†’</span>
          </Link>
        </div>

        <div className="stays-grid">
          {featuredStays.map((stay) => (
            <article className="stay-card" key={stay.name}>
              <div className={`stay-art ${stay.art}`} aria-hidden="true">
                <span className="demo-tag">Sample listing</span>
              </div>

              <div className="stay-card-copy">
                <p>{stay.type}</p>
                <h3>{stay.name}</h3>
                <span>Kariba area Â· Demonstration content</span>
                <div className="stay-card-bottom">
                  <small>Pricing shown when verified</small>
                  <Link to="/explore?category=Stays">
                    Explore <span aria-hidden="true">â†’</span>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="popular-experiences" id="popular-experiences">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Make a day of it</p>
            <h2>Popular experiences</h2>
            <p>Example activity categories. Providers and availability are not verified.</p>
          </div>

          <Link className="section-action" to="/explore?category=Activities">
            View activities <span aria-hidden="true">â†’</span>
          </Link>
        </div>

        <div className="experiences-grid">
          {experiences.map((experience, index) => (
            <Link
              className="experience-card"
              to="/explore?category=Activities"
              key={experience.name}
            >
              <div className={`experience-art ${experience.art}`} aria-hidden="true">
                <span>{String(index + 1).padStart(2, '0')}</span>
              </div>
              <div className="experience-copy">
                <p>Example category</p>
                <h3>{experience.name}</h3>
                <span>{experience.description}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="dining-section" id="dining">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Good food, good views</p>
            <h2>Restaurants &amp; dining</h2>
            <p>Sample dining categories. Business details and opening hours are not verified.</p>
          </div>

          <Link className="section-action" to="/explore?category=Food">
            View food listings <span aria-hidden="true">â†’</span>
          </Link>
        </div>

        <div className="dining-grid">
          {diningPlaces.map((place) => (
            <article className="dining-card" key={place.name}>
              <div className={`dining-art ${place.art}`} aria-hidden="true">
                <span className="demo-tag">Sample listing</span>
              </div>
              <div className="dining-copy">
                <p>{place.type}</p>
                <h3>{place.name}</h3>
                <span>Kariba area Â· Details to be verified</span>
                <Link to="/explore?category=Food">
                  Explore food listings <span aria-hidden="true">â†’</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="events-section" id="upcoming-events">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Mark the calendar</p>
            <h2>Upcoming events &amp; trips</h2>
            <p>Demonstration listings only. Dates, venues, and organisers are unconfirmed.</p>
          </div>

          <Link className="section-action" to="/explore?category=Events">
            View event listings <span aria-hidden="true">â†’</span>
          </Link>
        </div>

        <div className="events-grid">
          {sampleEvents.map((event) => (
            <Link
              className="event-card"
              to="/explore?category=Events"
              key={event.name}
            >
              <div className={`event-art ${event.art}`} aria-hidden="true">
                <span className="event-demo-label">Demonstration event</span>
              </div>
              <div className="event-copy">
                <p>Date to be confirmed</p>
                <h3>{event.name}</h3>
                <span>Sample event Â· Details unverified</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="kariba-places" id="places">
        <div className="places-intro">
          <p className="eyebrow">Explore Kariba</p>
          <h2>Discover amazing places</h2>
          <p>
            From lakeside views to wild landscapes, explore broad destination
            categories around Kariba.
          </p>
          <Link className="button places-button" to="/explore?category=Nature">
            Explore destinations <span aria-hidden="true">â†’</span>
          </Link>
        </div>

        <div className="places-grid">
          {karibaPlaces.map((place) => (
            <Link
              className="place-card"
              to={`/explore?category=${place.category}`}
              key={place.name}
            >
              <div className={`place-art ${place.art}`} aria-hidden="true" />
              <div className="place-copy">
                <span>{place.type}</span>
                <h3>{place.name}</h3>
                <small>Explore sample listings â†’</small>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Newsletter />

      <footer className="site-footer">
        <div className="footer-main">
          <div className="footer-about">
            <Link className="brand footer-brand" to="/" aria-label="Kariba Explorer home">
              <span className="brand-mark">K</span>
              <span>Kariba <em>Explorer</em></span>
            </Link>
            <p>
              Discover places, experiences, and inspiration for your time in Kariba.
            </p>
            <span className="footer-location">Kariba Â· Zimbabwe</span>
          </div>

          <div className="footer-column">
            <h3>Explore</h3>
            <Link to="/">Home</Link>
            <Link to="/explore">All places</Link>
            <a href="#featured-stays">Accommodation</a>
            <a href="#popular-experiences">Experiences</a>
          </div>

          <div className="footer-column">
            <h3>Discover</h3>
            <a href="#dining">Food &amp; dining</a>
            <a href="#upcoming-events">Events &amp; trips</a>
            <a href="#places">Places around Kariba</a>
            <a href="#newsletter">Newsletter</a>
          </div>

          <div className="footer-column footer-contact">
            <h3>Contact</h3>
            <p>Business and contact details will be added after verification.</p>
            <span>Listings shown on this site may be demonstration content.</span>
          </div>
        </div>

        <div className="footer-bottom">
          <span>Â© {new Date().getFullYear()} Kariba Explorer</span>
          <span>Frontend demonstration Â· No bookings or payments are processed</span>
        </div>
      </footer>
    </main>
  )
}

export default App













