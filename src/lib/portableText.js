// src/lib/portableText.js
// Renderer Portable Text personnalisé qui gère l'annotation termeLore
// Remplace toHTML de @portabletext/to-html partout dans le projet

import { toHTML } from '@portabletext/to-html'

/**
 * Convertit du Portable Text en HTML avec support des annotations termeLore.
 * Les termes marqués dans Sanity deviennent des <span data-lore-slug="...">
 * qui déclenchent les popups au hover.
 *
 * @param {Array} blocks - Tableau de blocs Portable Text
 * @returns {string} - HTML avec les annotations converties
 */
export function portableTextToHTML(blocks) {
  if (!blocks || !blocks.length) return ''

  return toHTML(blocks, {
    components: {
      // Gestion de l'annotation termeLore
      marks: {
        termeLore: ({ children, value }) => {
          // value.definition._ref contient l'ID Sanity de la définition
          // On utilise le slug stocké dans _ref pour la popup
          // Note: pour avoir le slug, on doit l'avoir résolu dans la query GROQ
          const slug = value?.definition?.slug?.current || value?.definition?._ref || ''
          const cat  = value?.definition?.categorie || ''
          if (!slug) return `<span>${children}</span>`
          return `<span class="lore-term" data-lore-slug="${slug}" data-cat="${cat}" tabindex="0">${children}</span>`
        },

        // Marks standards
        strong:    ({ children }) => `<strong>${children}</strong>`,
        em:        ({ children }) => `<em>${children}</em>`,
        underline: ({ children }) => `<span style="text-decoration:underline">${children}</span>`,
        'strike-through': ({ children }) => `<del>${children}</del>`,
      },

      // Styles de blocs
      block: {
        normal:      ({ children }) => `<p>${children}</p>`,
        h2:          ({ children }) => `<h2>${children}</h2>`,
        h3:          ({ children }) => `<h3>${children}</h3>`,
        h4:          ({ children }) => `<h4>${children}</h4>`,
        blockquote:  ({ children }) => `<blockquote>${children}</blockquote>`,
      },

      // Listes
      list: {
        bullet:  ({ children }) => `<ul>${children}</ul>`,
        number:  ({ children }) => `<ol>${children}</ol>`,
      },
      listItem: {
        bullet:  ({ children }) => `<li>${children}</li>`,
        number:  ({ children }) => `<li>${children}</li>`,
      },

      // Saut de ligne dur
      hardBreak: () => '<br>',
    }
  })
}
