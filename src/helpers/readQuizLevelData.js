import { getHost } from '@/globalState'
import { parseQuizFile } from './parseQuizFile'

export async function readQuizLevelData (folder, level) {
  if (!folder || !level) return console.error(`Failed to read quiz level: folder ${folder} or level ${level} not defined`)

  const fileName = level.toString().padStart(2, '0') + '.md'
  const data = await (await fetch(`${getHost()}/quiz/${folder}/${fileName}`)).text()

  return parseQuizFile(data)
}
