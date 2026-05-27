export default {
  name: 'personnage',
  title: 'Personnage',
  type: 'document',
  fields: [
    {
      name: 'nom',
      title: 'Nom complet',
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
      name: 'surnom',
      title: 'Surnom / Sous-titre',
      type: 'string'
    },
    {
      name: 'citation',
      title: 'Citation',
      type: 'string'
    },
    {
      name: 'role',
      title: 'Rôle',
      type: 'string',
      options: {
        list: [
          { title: 'Personnage joueur', value: 'PJ' },
          { title: 'Personnage non-joueur', value: 'PNJ' },
          { title: 'Antagoniste', value: 'antagoniste' }
        ]
      }
    },
    {
      name: 'lieu',
      title: 'Lieu d\'origine',
      type: 'string'
    },
    {
  name: 'resumeBio',
  title: 'Résumé biographique (affiché sur la fiche)',
  type: 'text',
  rows: 4,
  description: '2-3 phrases courtes affichées sur la page personnage'
},
    {
      name: 'biographie',
      title: 'Biographie',
      type: 'array',
      of: [{ type: 'block' }]
    },
    {
      name: 'imageHero',
      title: 'Image principale (hero)',
      type: 'image',
      options: { hotspot: true }
    },
    {
      name: 'imageDesign',
      title: 'Image character design',
      type: 'image',
      options: { hotspot: true }
    },
    {
      name: 'imageLieu',
      title: 'Image du lieu',
      type: 'image',
      options: { hotspot: true }
    },
    {
      name: 'galerie',
      title: 'Galerie d\'images',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }]
    },
    {
      name: 'nouvelle',
      title: 'Nouvelle associée',
      type: 'reference',
      to: [{ type: 'nouvelle' }]
    },
    {
  name: 'misEnAvantCarrousel',
  title: 'Mettre en avant dans le carrousel ?',
  type: 'boolean',
  initialValue: false
},
{
  name: 'ordreCarrousel',
  title: 'Ordre dans le carrousel (1, 2, 3...)',
  type: 'number'
},
{
  name: 'nouveau',
  title: 'Marquer comme "Nouveau" ?',
  type: 'boolean',
  initialValue: false
},

  ]
}
