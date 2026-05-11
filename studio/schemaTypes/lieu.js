export default {
  name: 'lieu',
  title: 'Lieu',
  type: 'document',
  fields: [
    {
      name: 'nom',
      title: 'Nom du lieu',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug URL',
      type: 'slug',
      options: { source: 'nom' },
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      title: 'Description courte',
      type: 'text',
      rows: 2
    },
    {
      name: 'imageHero',
      title: 'Image principale',
      type: 'image',
      options: { hotspot: true }
    },
    {
      name: 'misEnAvant',
      title: 'Afficher sur la page d\'accueil ?',
      type: 'boolean',
      initialValue: false
    },
    {
      name: 'ordre',
      title: 'Ordre d\'affichage',
      type: 'number'
    },
    {
      name: 'biographie',
      title: 'Description complète',
      type: 'array',
      of: [{ type: 'block' }]
    },
    {
      name: 'galerie',
      title: 'Galerie d\'images',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }]
    }
  ]
}
