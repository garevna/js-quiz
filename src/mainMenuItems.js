let items = []

import { categories } from './categories'

export function mainMenuItems (data) {
  if (!data) return items
  else {
    items = data
    const cats = items
      .flatMap(item => item.categories)
      .filter(item => !!item)
    categories(Array.from(new Set(cats)))
  }
}
