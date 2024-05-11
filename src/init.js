import { getHost } from '@/globalState'
import { mainMenuItems } from '@/mainMenuItems'

export async function init () {
  const items = await (await fetch(`${getHost()}/mainMenuData.json`)).json()
  const levels = await (await fetch(`${getHost()}/levels.json`)).json()

  // const mainMenuFolders = items.map(item => item.folder)
  // console.warn(mainMenuFolders.filter(folder => !levels[folder]))
  // console.warn(Object.keys(levels).filter(key => !mainMenuFolders.includes(key)))

  items.forEach(item => {
    const level = levels[item.folder]
    Object.assign(item, { levels: level })
  })

  mainMenuItems(items)
}
