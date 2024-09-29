export const compareChampions = (champion1, champion2) => {
  if(champion1.tier !== champion2.tier) {
    return champion1.tier - champion2.tier
  }
  return champion1.name.localeCompare(champion2.name)
}

export const extractIds = (champions) => {
  return champions.map(champion => champion.id)
}

export const getTeamSize = (champions) => {
  return champions.reduce((acc, champion) => {
    if (isDragon(champion)) {
      return acc + 2
    }
    return acc + 1
  }, 0)
}

export const isDragon = (champion) => {
  return champion.classes.includes('DRAGON')
}

export const sortChampions = (champions) => {
  return champions.slice().sort(compareChampions)
}

export default {
  compareChampions,
  extractIds,
  getTeamSize,
  isDragon,
  sortChampions,
}
