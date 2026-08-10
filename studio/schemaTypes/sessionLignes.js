export default {
  name: 'sessionLignes',
  title: 'Session — Les Lignes Effacées',
  type: 'document',
  fields: [
    {
      name: 'titre',
      title: 'Titre de la session',
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
      name: 'numero',
      title: 'Numéro de session',
      type: 'number',
      validation: Rule => Rule.required()
    },
    {
      name: 'date',
      title: 'Date de la session',
      type: 'date',
      options: { dateFormat: 'DD/MM/YYYY' }
    },
    {
      name: 'description',
      title: 'Description courte (pour la carte)',
      type: 'text',
      rows: 2
    },
    {
      name: 'resume',
      title: 'Résumé complet',
      type: 'array',
      of: [
        {
          type: 'block',
          marks: {
            annotations: [
              { type: 'termeLore' }
            ]
          }
        }
      ]
    },
    {
      name: 'videoYoutube',
      title: 'URL YouTube de la rediffusion',
      type: 'url',
      description: 'Ex: https://www.youtube.com/watch?v=XXXXXXXXX'
    },
    {
      name: 'imageVignette',
      title: 'Image de vignette',
      type: 'image',
      options: { hotspot: true }
    }
  ],
  orderings: [
    {
      title: 'Numéro de session (croissant)',
      name: 'numeroAsc',
      by: [{ field: 'numero', direction: 'asc' }]
    }
  ],
  preview: {
    select: { title: 'titre', subtitle: 'numero', media: 'imageVignette' },
    prepare({ title, subtitle, media }) {
      return { title, subtitle: `Session #${subtitle}`, media }
    }
  }
}
