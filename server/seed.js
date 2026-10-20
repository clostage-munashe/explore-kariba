import 'dotenv/config'
import { MongoClient } from 'mongodb'

const listings = [
  {
    slug: 'big-5-lodge',
    name: 'Big 5 Lodge',
    category: 'Stays',
    kind: 'Lodge',
    location: 'Kariba',
    description: 'A lodge overlooking Lake Kariba.',
    details: ['Contact the lodge to confirm current rates and room availability.'],
    source: 'Visit Kariba',
    sourceUrl: 'https://www.visitkariba.com/listings/accommodation',
    published: true,
  },
  {
    slug: 'caribbea-bay-hotel',
    name: 'Caribbea Bay Hotel',
    category: 'Stays',
    kind: 'Hotel',
    location: 'Kariba',
    description: 'A hotel in the resort town of Kariba.',
    details: ['Contact the hotel to confirm current rates and room availability.'],
    source: 'Visit Kariba',
    sourceUrl: 'https://www.visitkariba.com/listings/accommodation',
    published: true,
  },
  {
    slug: 'changa-safari-camp',
    name: 'Changa Safari Camp',
    category: 'Stays',
    kind: 'Safari camp',
    location: 'Lake Kariba shoreline',
    description: 'A safari camp on Lake Kariba with views of the Matusadona Mountains.',
    details: ['Contact the camp to confirm current rates and availability.'],
    source: 'Visit Kariba',
    sourceUrl: 'https://www.visitkariba.com/listings/accommodation',
    published: true,
  },
  {
    slug: 'hornbill-lodge',
    name: 'Hornbill Lodge',
    category: 'Stays',
    kind: 'Boutique lodge',
    location: 'Kariba',
    description: 'A boutique lodge situated on Mica Point in Kariba.',
    details: ['Contact the lodge to confirm current rates and availability.'],
    source: 'Visit Kariba',
    sourceUrl: 'https://www.visitkariba.com/listings/accommodation',
    published: true,
  },
  {
    slug: 'flavors-restaurant-bar',
    name: 'Flavors Restaurant & Bar',
    category: 'Food',
    kind: 'Restaurant and bar',
    location: 'Kariba',
    description: 'A listed Kariba dining business.',
    details: ['Ask the business directly for its current menu, prices, and opening hours.'],
    source: 'Visit Kariba',
    sourceUrl: 'https://www.visitkariba.com/listings/local-businesses/flavors-restaurant-bar',
    published: true,
  },
  {
    slug: 'kariba-catering',
    name: 'Kariba Catering',
    category: 'Food',
    kind: 'Catering service',
    location: 'Kariba',
    description: 'Catering for houseboat travel and lodges, with set and customised menus listed.',
    details: ['Contact the business for current menus and prices.'],
    source: 'Visit Kariba',
    sourceUrl: 'https://www.visitkariba.com/listings/local-businesses/kariba-catering',
    published: true,
  },
  {
    slug: 'shenga-expeditions',
    name: 'Shenga Expeditions',
    category: 'Activities',
    kind: 'Tour operator',
    location: 'Kariba Recreational Park',
    description: 'Visit Kariba lists this operator for game drives in the Kariba Recreational Park.',
    details: ['Contact the operator to confirm activities, dates, and prices.'],
    source: 'Visit Kariba',
    sourceUrl: 'https://www.visitkariba.com/listings/activities',
    published: true,
  },
  {
    slug: 'matusadona-guided-game-drives',
    name: 'Guided game drives',
    category: 'Activities',
    kind: 'Guided safari',
    location: 'Matusadona National Park',
    description: 'The park lists guided morning and afternoon game drives for visitors.',
    details: ['Confirm bookings, access, and current conditions with the park.'],
    source: 'Matusadona National Park',
    sourceUrl: 'https://visitmatusadona.org/',
    published: true,
  },
  {
    slug: 'matusadona-walking-safaris',
    name: 'Guided walking safaris',
    category: 'Activities',
    kind: 'Guided safari',
    location: 'Matusadona National Park',
    description: 'Guided walking safaris are listed among the park’s visitor activities.',
    details: ['Confirm requirements and bookings with the park before travelling.'],
    source: 'Matusadona National Park',
    sourceUrl: 'https://visitmatusadona.org/',
    published: true,
  },
  {
    slug: 'matusadona-national-park',
    name: 'Matusadona National Park',
    category: 'Nature',
    kind: 'National park',
    location: 'Southern shore of Lake Kariba',
    description: 'A protected wilderness area on Lake Kariba’s southern shore.',
    details: ['Check current access information and park rules before travelling.'],
    source: 'Matusadona National Park',
    sourceUrl: 'https://visitmatusadona.org/',
    published: true,
  },
  {
    slug: 'matusadona-birdwatching',
    name: 'Birdwatching in Matusadona',
    category: 'Nature',
    kind: 'Birdlife',
    location: 'Matusadona National Park',
    description: 'The park describes nearly 400 bird species in the area.',
    details: ['Ask the park about access and guided birdwatching.'],
    source: 'Matusadona National Park',
    sourceUrl: 'https://visitmatusadona.org/',
    published: true,
  },
]

async function seedListings() {
  const client = new MongoClient(process.env.MONGODB_URI)

  try {
    await client.connect()

    const db = client.db(process.env.DB_NAME)
    const collection = db.collection('listings')

    await collection.createIndex({ slug: 1 }, { unique: true })
    await collection.createIndex({ category: 1, published: 1 })

    const result = await collection.bulkWrite(
      listings.map((listing) => ({
        updateOne: {
          filter: { slug: listing.slug },
          update: { $set: listing },
          upsert: true,
        },
      })),
    )

    console.log(
      `Listings saved. Added: ${result.upsertedCount}; updated: ${result.modifiedCount}.`,
    )
  } catch (error) {
    console.error('Could not seed listings:', error.message)
    process.exitCode = 1
  } finally {
    await client.close()
  }
}

seedListings()