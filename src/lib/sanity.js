import { createClient } from '@sanity/client'
 
export const sanityClient = createClient({
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID,
  dataset: import.meta.env.PUBLIC_SANITY_DATASET,
  apiVersion: '2024-01-01',
  useCdn: true,
})
 
// Fonction helper pour les URLs d'images Sanity
export function imageUrl(source) {
  if (!source?.asset?._ref) return null
  const ref = source.asset._ref
  const [, id, dimensions, format] = ref.split('-')
  return `https://cdn.sanity.io/images/${import.meta.env.PUBLIC_SANITY_PROJECT_ID}/production/${id}-${dimensions}.${format}`
}
