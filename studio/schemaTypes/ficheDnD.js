export default {
  name: 'ficheDnD',
  title: 'Fiche D&D 5e',
  type: 'document',
  fields: [
    // ── LIEN VERS PERSONNAGE ──
    {
      name: 'personnage',
      title: 'Personnage lié',
      type: 'reference',
      to: [{ type: 'personnage' }],
      validation: Rule => Rule.required(),
      description: 'Le personnage PJ auquel cette fiche appartient'
    },
    {
      name: 'motDePasse',
      title: 'Mot de passe d\'accès',
      type: 'string',
      validation: Rule => Rule.required(),
      description: 'Mot de passe choisi par le joueur (ex: bleu)'
    },

    // ── EN-TÊTE ──
    {
      name: 'classeNiveau',
      title: 'Classe & Niveau',
      type: 'string',
      description: 'Ex: Roublard 5 / Guerrier 2'
    },
    {
      name: 'historique',
      title: 'Historique',
      type: 'string',
      description: 'Ex: Criminel, Soldat, Sage...'
    },
    {
      name: 'nomJoueur',
      title: 'Nom du joueur',
      type: 'string'
    },
    {
      name: 'race',
      title: 'Race',
      type: 'string',
      description: 'Ex: Demi-Elfe, Humain, Nain...'
    },
    {
      name: 'alignement',
      title: 'Alignement',
      type: 'string',
      options: {
        list: [
          { title: 'Loyal Bon', value: 'Loyal Bon' },
          { title: 'Neutre Bon', value: 'Neutre Bon' },
          { title: 'Chaotique Bon', value: 'Chaotique Bon' },
          { title: 'Loyal Neutre', value: 'Loyal Neutre' },
          { title: 'Neutre', value: 'Neutre' },
          { title: 'Chaotique Neutre', value: 'Chaotique Neutre' },
          { title: 'Loyal Mauvais', value: 'Loyal Mauvais' },
          { title: 'Neutre Mauvais', value: 'Neutre Mauvais' },
          { title: 'Chaotique Mauvais', value: 'Chaotique Mauvais' },
        ]
      }
    },
    {
      name: 'pointsExperience',
      title: 'Points d\'expérience',
      type: 'number',
      initialValue: 0
    },

    // ── CARACTÉRISTIQUES ──
    {
      name: 'caracteristiques',
      title: 'Caractéristiques',
      type: 'object',
      fields: [
        { name: 'force',        title: 'Force',        type: 'number', initialValue: 10 },
        { name: 'dexterite',    title: 'Dextérité',    type: 'number', initialValue: 10 },
        { name: 'constitution', title: 'Constitution', type: 'number', initialValue: 10 },
        { name: 'intelligence', title: 'Intelligence', type: 'number', initialValue: 10 },
        { name: 'sagesse',      title: 'Sagesse',      type: 'number', initialValue: 10 },
        { name: 'charisme',     title: 'Charisme',     type: 'number', initialValue: 10 },
      ]
    },

    // ── INSPIRATION & MAÎTRISE ──
    {
      name: 'inspiration',
      title: 'Inspiration',
      type: 'boolean',
      initialValue: false
    },
    {
      name: 'bonusMaitrise',
      title: 'Bonus de maîtrise',
      type: 'number',
      initialValue: 2
    },

    // ── JETS DE SAUVEGARDE (maîtrise oui/non) ──
    {
      name: 'jetsSauvegarde',
      title: 'Jets de sauvegarde (maîtrisés)',
      type: 'object',
      fields: [
        { name: 'force',        title: 'Force',        type: 'boolean', initialValue: false },
        { name: 'dexterite',    title: 'Dextérité',    type: 'boolean', initialValue: false },
        { name: 'constitution', title: 'Constitution', type: 'boolean', initialValue: false },
        { name: 'intelligence', title: 'Intelligence', type: 'boolean', initialValue: false },
        { name: 'sagesse',      title: 'Sagesse',      type: 'boolean', initialValue: false },
        { name: 'charisme',     title: 'Charisme',     type: 'boolean', initialValue: false },
      ]
    },

    // ── COMPÉTENCES (maîtrise oui/non) ──
    {
      name: 'competences',
      title: 'Compétences (maîtrisées)',
      type: 'object',
      fields: [
        { name: 'acrobaties',    title: 'Acrobaties (DEX)',        type: 'boolean', initialValue: false },
        { name: 'arcanes',       title: 'Arcanes (INT)',            type: 'boolean', initialValue: false },
        { name: 'athletisme',    title: 'Athlétisme (FOR)',         type: 'boolean', initialValue: false },
        { name: 'discretion',    title: 'Discrétion (DEX)',         type: 'boolean', initialValue: false },
        { name: 'dressage',      title: 'Dressage (SAG)',           type: 'boolean', initialValue: false },
        { name: 'escamotage',    title: 'Escamotage (DEX)',         type: 'boolean', initialValue: false },
        { name: 'histoire',      title: 'Histoire (INT)',           type: 'boolean', initialValue: false },
        { name: 'intimidation',  title: 'Intimidation (CHA)',       type: 'boolean', initialValue: false },
        { name: 'investigation', title: 'Investigation (INT)',      type: 'boolean', initialValue: false },
        { name: 'medecine',      title: 'Médecine (SAG)',           type: 'boolean', initialValue: false },
        { name: 'nature',        title: 'Nature (INT)',             type: 'boolean', initialValue: false },
        { name: 'perception',    title: 'Perception (SAG)',         type: 'boolean', initialValue: false },
        { name: 'perspicacite',  title: 'Perspicacité (SAG)',       type: 'boolean', initialValue: false },
        { name: 'persuasion',    title: 'Persuasion (CHA)',         type: 'boolean', initialValue: false },
        { name: 'religion',      title: 'Religion (INT)',           type: 'boolean', initialValue: false },
        { name: 'representation',title: 'Représentation (CHA)',    type: 'boolean', initialValue: false },
        { name: 'survie',        title: 'Survie (SAG)',             type: 'boolean', initialValue: false },
        { name: 'tromperie',     title: 'Tromperie (CHA)',          type: 'boolean', initialValue: false },
      ]
    },

    // ── COMBAT ──
    {
      name: 'combat',
      title: 'Combat',
      type: 'object',
      fields: [
        { name: 'classeArmure',    title: 'Classe d\'armure (CA)',  type: 'number', initialValue: 10 },
        { name: 'initiative',      title: 'Initiative',             type: 'number', initialValue: 0  },
        { name: 'vitesse',         title: 'Vitesse (m)',            type: 'number', initialValue: 9  },
        { name: 'pointsVieMax',    title: 'Points de vie max',      type: 'number', initialValue: 0  },
        { name: 'pointsVieActuels',title: 'Points de vie actuels',  type: 'number', initialValue: 0  },
        { name: 'pointsVieTemp',   title: 'Points de vie temporaires', type: 'number', initialValue: 0 },
        { name: 'desDieActuels',   title: 'Dés de vie actuels',    type: 'string', description: 'Ex: 3d8' },
        { name: 'desDieTotal',     title: 'Dés de vie total',      type: 'string', description: 'Ex: 5d8' },
        { name: 'succesContreMort',title: 'Succès contre la mort', type: 'number', initialValue: 0, description: '0 à 3' },
        { name: 'echecsContreMort',title: 'Échecs contre la mort', type: 'number', initialValue: 0, description: '0 à 3' },
      ]
    },

    // ── ATTAQUES ──
    {
      name: 'attaques',
      title: 'Attaques et sorts',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'nom',      title: 'Nom',           type: 'string' },
            { name: 'bonusAtt', title: 'Bonus d\'ATT',  type: 'string', description: 'Ex: +5' },
            { name: 'degats',   title: 'Dégâts / Type', type: 'string', description: 'Ex: 1d6+3 tranchant' },
          ],
          preview: {
            select: { title: 'nom', subtitle: 'degats' }
          }
        }
      ]
    },

    // ── PERSO & TRAITS ──
    {
      name: 'traitsPersonnalite',
      title: 'Traits de personnalité',
      type: 'text',
      rows: 3
    },
    {
      name: 'ideaux',
      title: 'Idéaux',
      type: 'text',
      rows: 2
    },
    {
      name: 'liens',
      title: 'Liens',
      type: 'text',
      rows: 2
    },
    {
      name: 'defauts',
      title: 'Défauts',
      type: 'text',
      rows: 2
    },

    // ── BAS DE FICHE ──
    {
      name: 'sagessPerceptionPassive',
      title: 'Sagesse (Perception) passive',
      type: 'number',
      initialValue: 10
    },
    {
      name: 'autresMaitrises',
      title: 'Autres maîtrises et langues',
      type: 'text',
      rows: 4
    },
    {
      name: 'equipement',
      title: 'Équipement',
      type: 'text',
      rows: 6
    },
    {
      name: 'capacitesTrait',
      title: 'Capacités et traits',
      type: 'text',
      rows: 8
    },
  ],

  preview: {
    select: {
      title: 'personnage.nom',
      subtitle: 'classeNiveau'
    },
    prepare({ title, subtitle }) {
      return { title: title || 'Fiche sans nom', subtitle: subtitle || '' }
    }
  }
}
