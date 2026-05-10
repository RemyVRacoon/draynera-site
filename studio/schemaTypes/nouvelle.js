export default {
  name: 'nouvelle',
  title: 'Nouvelle',
  type: 'document',
  fields: [
    { name: 'titre', title: 'Titre', type: 'string', validation: Rule => Rule.required() },
    { name: 'slug', title: 'Slug URL', type: 'slug', options: { source: 'titre' } },
    { name: 'auteur', title: 'Auteur', type: 'string' },
    { name: 'resume', title: 'Résumé court', type: 'text', rows: 3 },
    { name: 'contenu', title: 'Contenu', type: 'array', of: [{ type: 'block' }] }
  ]
}
