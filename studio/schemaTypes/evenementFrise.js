export default {
  name: 'evenementFrise',
  title: 'Événement de frise',
  type: 'document',
  fields: [
    {
      name: 'titre',
      title: 'Titre de l\'événement',
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
      name: 'date',
      title: 'Date / Période',
      type: 'string',
      validation: Rule => Rule.required(),
      description: 'Ex: An 0, IIIe siècle, -200 AF, Époque inconnue...'
    },
    {
      name: 'ordreChronologique',
      title: 'Ordre chronologique',
      type: 'number',
      validation: Rule => Rule.required(),
      description: 'Nombre entier pour trier les événements (1 = le plus ancien)'
    },
    {
      name: 'age',
      title: 'Âge historique',
      type: 'reference',
      to: [{ type: 'age' }],
      description: 'Âge auquel appartient cet événement'
    },
    {
      name: 'resume',
      title: 'Résumé',
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
      ],
      validation: Rule => Rule.required()
    },
    {
      name: 'image',
      title: 'Image d\'illustration (optionnelle)',
      type: 'image',
      options: { hotspot: true },
      description: 'Bannière illustrant l\'événement — format large recommandé (16/5)'
    },
    {
      name: 'importance',
      title: 'Importance',
      type: 'string',
      options: {
        list: [
          { title: 'Majeur', value: 'majeur' },
          { title: 'Normal', value: 'normal' },
          { title: 'Mineur', value: 'mineur' }
        ]
      },
      initialValue: 'normal'
    }
  ],
  orderings: [
    {
      title: 'Ordre chronologique',
      name: 'chronoAsc',
      by: [{ field: 'ordreChronologique', direction: 'asc' }]
    }
  ],
  preview: {
    select: {
      title: 'titre',
      subtitle: 'date',
      media: 'image'
    }
  }
}
