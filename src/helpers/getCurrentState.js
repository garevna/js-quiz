export function getCurrentState () {
  const folderInfo = localStorage.getItem('current-quiz')

  return folderInfo
    ? JSON.parse(folderInfo)
    : { folder: null, title: '', levels: [], maxScore: 0, currentLevel: 0, lives: 10, score: 0 }
}
