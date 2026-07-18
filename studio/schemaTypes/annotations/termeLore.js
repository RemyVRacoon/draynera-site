// studio/schemas/annotations/termeLore.js
// Cette annotation permet de marquer des mots dans l'éditeur de texte Sanity
// et de les lier à une définition du dictionnaire

export default {
  name: 'termeLore',
  title: 'Terme du Lore',
  type: 'object',
  fields: [
    {
      name: 'definition',
      title: 'Définition liée',
      type: 'reference',
      to: [{ type: 'definition' }],
      validation: Rule => Rule.required()
    }
  ],
  // Apparence dans l'éditeur Sanity
  blockEditor: {
    icon: () => '◆',
    render: ({ children }) => children
  }
}
