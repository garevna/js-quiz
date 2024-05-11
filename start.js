const fs = require('fs')
const path = require('path')

const dirPath = path.join(__dirname, 'public', 'quiz')

const result = {}

const dirEntries = fs.readdirSync(dirPath, { withFileTypes: true })

for (const dirEntry of dirEntries) {
  const pathName = path.join(dirPath,  dirEntry.name)

  Object.assign(result, {
    [dirEntry.name]: []
  })

  if (dirEntry.isDirectory()) {
    const files = fs.readdirSync(pathName, { withFileTypes: true })
    result[dirEntry.name].push(...files.map(file => file.name.replace('.md', '')))
  }
}

fs.writeFileSync(path.join(__dirname, 'public', 'levels.json'), JSON.stringify(result), { encoding: 'utf-8' })
