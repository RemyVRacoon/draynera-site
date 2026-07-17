export default {
  name: 'age',
  title: 'Âge historique',
  type: 'document',
  fields: [
    {
      name: 'titre',
      title: 'Titre de l\'âge',
      type: 'string',
      validation: Rule => Rule.required(),
      description: 'Ex: Âge de la Fondation'
    },
    {
      name: 'slug',
      title: 'Slug URL',
      type: 'slug',
      options: { source: 'titre' },
      validation: Rule => Rule.required()
    },
    {
      name: 'ordre',
      title: 'Ordre d\'affichage',
      type: 'number',
      validation: Rule => Rule.required(),
      description: '1 = premier affiché'
    },
    {
      name: 'description',
      title: 'Description courte',
      type: 'text',
      rows: 2
    },
    {
      name: 'imageHero',
      title: 'Image de fond du bouton',
      type: 'image',
      options: { hotspot: true }
    },
    {
      name: 'couleurAccent',
      title: 'Couleur d\'accent (hex)',
      type: 'string',
      description: 'Ex: #c9a84c — optionnel, pour différencier les âges'
    }
  ],
  orderings: [
    {
      title: 'Ordre d\'affichage',
      name: 'ordreAsc',
      by: [{ field: 'ordre', direction: 'asc' }]
    }
  ],
  preview: {
    select: { title: 'titre', subtitle: 'ordre', media: 'imageHero' },
    prepare({ title, subtitle, media }) {
      return { title, subtitle: `Ordre #${subtitle}`, media }
    }
  }
}
