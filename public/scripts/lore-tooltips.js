/**
 * DRAYNERA — Système de popups Lore (style Crusader Kings 3)
 * 
 * Fonctionnement :
 * - Surveille les éléments [data-lore-slug] dans la page
 * - Au hover, affiche une popup après un délai configurable
 * - Les popups sont empilables (jusqu'à MAX_POPUPS)
 * - Chaque popup peut contenir des termes cliquables qui ouvrent d'autres popups
 * - Les données sont chargées depuis l'API Sanity à la demande (cache local)
 */

(function () {
  // ── CONFIG ──────────────────────────────────────────────
  const HOVER_DELAY   = 600    // ms avant affichage
  const MAX_POPUPS    = 5      // max popups empilées
  const SANITY_PROJECT= document.documentElement.dataset.sanityProject || ''
  const SANITY_DATASET= document.documentElement.dataset.sanityDataset || 'production'
  const API_VERSION   = '2024-01-01'

  // ── STATE ────────────────────────────────────────────────
  const cache         = {}     // { slug: definitionData }
  const popupStack    = []     // liste des popups ouvertes
  let   hoverTimer    = null

  // ── UTILITAIRES ──────────────────────────────────────────

  function sanityUrl(slug) {
    const query = encodeURIComponent(
      `*[_type == "definition" && slug.current == "${slug}"][0]{
        terme, categorie, definition, lienVersPage, slug
      }`
    )
    return `https://${SANITY_PROJECT}.api.sanity.io/v${API_VERSION}/data/query/${SANITY_DATASET}?query=${query}`
  }

  async function fetchDefinition(slug) {
    if (cache[slug]) return cache[slug]
    try {
      const res  = await fetch(sanityUrl(slug))
      const data = await res.json()
      cache[slug] = data.result || null
      return cache[slug]
    } catch {
      return null
    }
  }

  function categoryLabel(cat) {
    const labels = {
      personnage:   '👤 Personnage',
      lieu:         '📍 Lieu',
      lore:         '📖 Concept',
      organisation: '⚔️ Organisation',
      evenement:    '⚡ Événement',
      objet:        '💎 Objet'
    }
    return labels[cat] || '◆ Lore'
  }

  // ── CRÉATION POPUP ────────────────────────────────────────

  function createPopup(def, anchorEl, stackIndex) {
    const popup = document.createElement('div')
    popup.className = 'lore-popup'
    popup.dataset.stackIndex = stackIndex
    popup.setAttribute('role', 'tooltip')

    // Contenu HTML de la popup
    popup.innerHTML = `
      <div class="lore-popup-inner">
        <div class="lore-popup-header">
          <span class="lore-popup-cat">${categoryLabel(def.categorie)}</span>
          <button class="lore-popup-close" aria-label="Fermer">✕</button>
        </div>
        <h4 class="lore-popup-titre">${def.terme}</h4>
        <p class="lore-popup-def">${renderDefinitionWithTerms(def.definition)}</p>
        ${def.lienVersPage ? `<a href="${def.lienVersPage}" class="lore-popup-lien">Voir la page complète →</a>` : ''}
      </div>
    `

    // Position
    positionPopup(popup, anchorEl, stackIndex)
    document.body.appendChild(popup)

    // Fermeture au clic sur ✕
    popup.querySelector('.lore-popup-close').addEventListener('click', (e) => {
      e.stopPropagation()
      closePopupsFrom(stackIndex)
    })

    // Fermeture au clic en dehors
    popup.addEventListener('click', e => e.stopPropagation())

    // Init les termes dans la popup
    initTerms(popup)

    // Animation entrée
    requestAnimationFrame(() => popup.classList.add('lore-popup-visible'))

    return popup
  }

  function renderDefinitionWithTerms(text) {
    // Les termes dans la définition sont marqués avec [[slug|texte]]
    // Ex: "Les [[sanguinite|Sanguinités]] sont les maisons nobles de..."
    return text.replace(/\[\[([^\|]+)\|([^\]]+)\]\]/g, (_, slug, label) => {
      return `<span class="lore-term" data-lore-slug="${slug}" tabindex="0">${label}</span>`
    })
  }

  function positionPopup(popup, anchorEl, stackIndex) {
    document.body.appendChild(popup)

    const anchor = anchorEl.getBoundingClientRect()
    const scrollY = window.scrollY
    const scrollX = window.scrollX
    const vw = window.innerWidth
    const vh = window.innerHeight

    const popupW = 280
    const offset = stackIndex * 20  // décalage en cascade

    let left = anchor.left + scrollX + offset
    let top  = anchor.bottom + scrollY + 8 + offset

    // Débordement à droite
    if (left + popupW > vw + scrollX - 16) {
      left = anchor.right + scrollX - popupW - offset
    }

    // Débordement en bas
    if (anchor.bottom + 200 > vh) {
      top = anchor.top + scrollY - 200 - offset
    }

    popup.style.left  = `${Math.max(8, left)}px`
    popup.style.top   = `${Math.max(8, top)}px`
    popup.style.zIndex = `${9000 + stackIndex}`
  }

  // ── GESTION DU STACK ─────────────────────────────────────

  function closePopupsFrom(fromIndex) {
    while (popupStack.length > fromIndex) {
      const p = popupStack.pop()
      if (p) {
        p.classList.remove('lore-popup-visible')
        setTimeout(() => p.remove(), 200)
      }
    }
  }

  function closeAllPopups() {
    closePopupsFrom(0)
  }

  async function openPopup(slug, anchorEl) {
    // Pas plus de MAX_POPUPS
    if (popupStack.length >= MAX_POPUPS) return

    // Évite de rouvrir le même slug au même niveau
    const currentIndex = popupStack.length
    const def = await fetchDefinition(slug)
    if (!def) return

    // Ferme les popups au-dessus du niveau actuel si on ouvre depuis un niveau inférieur
    const anchorPopup = anchorEl.closest('.lore-popup')
    if (anchorPopup) {
      const anchorLevel = parseInt(anchorPopup.dataset.stackIndex) + 1
      closePopupsFrom(anchorLevel)
    }

    const popup = createPopup(def, anchorEl, popupStack.length)
    popupStack.push(popup)
  }

  // ── INIT TERMES ──────────────────────────────────────────

  function initTerms(container) {
    const terms = container.querySelectorAll('[data-lore-slug]')

    terms.forEach(term => {
      // Évite la double initialisation
      if (term.dataset.loreInit) return
      term.dataset.loreInit = '1'

      term.addEventListener('mouseenter', () => {
        clearTimeout(hoverTimer)
        hoverTimer = setTimeout(() => {
          openPopup(term.dataset.loreSlug, term)
        }, HOVER_DELAY)
      })

      term.addEventListener('mouseleave', () => {
        clearTimeout(hoverTimer)
      })

      // Accessibilité clavier
      term.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          openPopup(term.dataset.loreSlug, term)
        }
      })
    })
  }

  // ── FERMETURE GLOBALE ────────────────────────────────────

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.lore-popup') && !e.target.closest('[data-lore-slug]')) {
      closeAllPopups()
    }
  })

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeAllPopups()
  })

  // ── INIT PRINCIPALE ──────────────────────────────────────

  function init() {
    initTerms(document)
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init)
  } else {
    init()
  }

  // Expose pour usage externe si besoin
  window.DrayneraLore = { openPopup, closeAllPopups, fetchDefinition }

})()
