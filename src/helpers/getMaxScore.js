import { readQuizLevelData } from './readQuizLevelData'

export async function getMaxScore (folder, levels) {
  let maxScore = 0
  for (const level of levels) {
    const { balls } = await readQuizLevelData(folder, level)
    maxScore += balls
  }
  return maxScore
}
