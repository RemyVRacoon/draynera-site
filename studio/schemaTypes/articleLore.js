export default {
  name: 'articleLore',
  title: 'Article de Lore',
  type: 'document',
  fields: [
    {
      name: 'titre',
      title: 'Titre de l\'article',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug URL',
      type: 'slug',
      options: { source: 'titre' },
      validation: Rule => Rule.required()
    },
    {
      name: 'age',
      title: 'Âge historique parent',
      type: 'reference',
      to: [{ type: 'age' }],
      validation: Rule => Rule.required(),
      description: 'À quel âge appartient cet article ?'
    },
    {
      name: 'ordre',
      title: 'Ordre dans l\'âge',
      type: 'number',
      description: 'Ordre d\'affichage dans la liste des sous-boutons'
    },
    {
      name: 'description',
      title: 'Description courte (sous-bouton)',
      type: 'text',
      rows: 2
    },
    {
      name: 'contenu',
      title: 'Contenu complet',
      type: 'array',
      of: [{ type: 'block' }]
    },
    {
      name: 'imageHero',
      title: 'Image principale',
      type: 'image',
      options: { hotspot: true }
    },
    {
      name: 'imageBtn',
      title: 'Image de fond du sous-bouton',
      type: 'image',
      options: { hotspot: true }
    }
  ],
  orderings: [
    {
      title: 'Par âge puis ordre',
      name: 'ageOrdre',
      by: [
        { field: 'age.titre', direction: 'asc' },
        { field: 'ordre', direction: 'asc' }
      ]
    }
  ],
  preview: {
    select: {
      title: 'titre',
      subtitle: 'age.titre',
      media: 'imageHero'
    },
    prepare({ title, subtitle, media }) {
      return { title, subtitle: subtitle || 'Sans âge', media }
    }
  }
}
