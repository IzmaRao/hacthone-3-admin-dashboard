import { createClient } from '@sanity/client';
import { fileURLToPath } from 'url'
import path from 'path';
import dotenv from 'dotenv';

// Load environment variables from .env.local
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
dotenv.config({ path: path.resolve(__dirname, '../.env') })
// Create Sanity client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  token: process.env.NEXT_PUBLIC_SANITY_API_TOKEN,
  apiVersion: '2025-01-14'
});


async function importData() {
  try {
    console.log('Fetching products from API...')
    const response = await fetch(`${process.env.NEXT_PUBLIC_PAGE_URL}`);
    
    const products = await response.json();
    for (const product of products) {
      console.log(`Processing product: ${product.name}`)
      const sanityProduct = {
        _type: 'product',
        name: product.name,
        description: product.description,
        price: product.price,
        tags: product.tags,
        width: product.width,
        height: product.height,
        image: product.image,
        rating: product.rating,
        stockQuantity: product.stockQuantity,
        id: product.id,
        discountPercentage: product.discountPercentage,
        isFeaturedProduct: product.isFeaturedProduct,
        catogory: product.catogory,
      }
      console.log('Uploading product to Sanity:', sanityProduct.name)
      const result = await client.create(sanityProduct)
      console.log(`Product uploaded successfully: ${result._id}`)
    }
    console.log('Data import completed successfully!')
  } catch (error) {
    console.error('Error importing data:', error)
  }
}
importData()