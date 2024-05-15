import { getHost } from '@/globalState'
import { mainMenuItems } from '@/mainMenuItems'

import { getMaxScore } from '@/helpers'

export async function init () {
  const items = await (await fetch(`${getHost()}/mainMenuData.json`)).json()
  const allLevels = await (await fetch(`${getHost()}/levels.json`)).json()

  items.forEach(item => Object.assign(item, { levels: allLevels[item.folder] }))

  mainMenuItems(items)

  const tmp = localStorage.getItem('current-quiz')

  const target = location.hash
    ? location.hash.slice(1)
    : tmp ? JSON.parse(tmp).folder : null

  if (target) {
    const record = items.find(item => item.folder === target)

    if (record) {
      const { folder, title, levels } = record

      const maxScore = await getMaxScore(folder, levels)

      var currentQuizData = JSON.stringify({
        folder,
        title,
        currentLevel: 0,
        lives: 10,
        maxScore,
        score: 0,
        levels
      })

      localStorage.setItem('current-quiz', currentQuizData)
    } else localStorage.removeItem('current-quiz')
  }

  const mainMenuFolders = items.map(item => item.folder)
  const warnings = mainMenuFolders
    .filter(folder => !allLevels[folder])
    .concat(Object.keys(allLevels).filter(key => !mainMenuFolders.includes(key)))
  warnings.length && console.warn(warnings)
}
