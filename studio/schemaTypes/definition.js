export default {
  name: 'definition',
  title: 'Définition / Terme du lore',
  type: 'document',
  fields: [
    {
      name: 'terme',
      title: 'Terme',
      type: 'string',
      validation: Rule => Rule.required(),
      description: 'Le mot ou groupe de mots (ex: Sanguinité, Gardemer, Jarad...)'
    },
    {
      name: 'slug',
      title: 'Slug (identifiant unique)',
      type: 'slug',
      options: { source: 'terme' },
      validation: Rule => Rule.required()
    },
    {
      name: 'categorie',
      title: 'Catégorie',
      type: 'string',
      options: {
        list: [
          { title: 'Personnage', value: 'personnage' },
          { title: 'Lieu', value: 'lieu' },
          { title: 'Concept / Lore', value: 'lore' },
          { title: 'Organisation', value: 'organisation' },
          { title: 'Événement', value: 'evenement' },
          { title: 'Objet', value: 'objet' },
        ]
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'definition',
      title: 'Définition courte',
      type: 'text',
      rows: 3,
      validation: Rule => Rule.required(),
      description: 'Texte affiché dans la popup — 1 à 3 phrases maximum'
    },
    {
      name: 'lienVersPage',
      title: 'Lien vers une page complète (optionnel)',
      type: 'string',
      description: 'Ex: /personnages/jarad-brin-de-chene ou /lieux/gardemer'
    }
  ],
  preview: {
    select: { title: 'terme', subtitle: 'categorie' },
    prepare({ title, subtitle }) {
      const icons = {
        personnage: '👤', lieu: '📍', lore: '📖',
        organisation: '⚔️', evenement: '⚡', objet: '💎'
      }
      return { title, subtitle: `${icons[subtitle] || '◆'} ${subtitle}` }
    }
  }
}
