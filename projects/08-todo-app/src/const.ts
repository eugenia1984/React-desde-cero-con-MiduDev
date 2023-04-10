export const TODO_FILTERS = {
  ALL: 'all',
  ACTIVE: 'active',
  COMPLETED: 'completed'
} as const

export const FILTERS_BUTTONS = {
  [TODO_FILTERS.ALL]: {
    literal: 'all',
    href: `/?filters=${ TODO_FILTERS.ALL }`
  },
  [TODO_FILTERS.ACTIVE]: {
    literal: 'active',
    href: `/?filters=${ TODO_FILTERS.ACTIVE }`
  },
  [TODO_FILTERS.COMPLETED]: {
    literal: 'completed',
    href: `/?filters=${ TODO_FILTERS.COMPLETED }`
  }
} as const