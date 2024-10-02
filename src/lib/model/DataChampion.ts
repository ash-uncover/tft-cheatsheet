// #region custom
export interface DataCustomChampions {
  champions: DataCustomChampion[]
}
export interface DataCustomChampion {
  id: string
  origins: string[]
  classes: string[]
  skin: string
  health: {
    0: number
    1: number
    2: number
  }
  damage: {
    0: number
    1: number
    2: number
  }
  mana: number
  manaBase: number
  ability: number
  speed: number
  armor: number
  resist : number
}
// #endregion

// #region lol
export interface LolDataChampion {  
  id: string
  name: string
  tier: 1 | 2 | 3 | 4 | 5
  image: {
    full: string
    sprite: string
    group: string
    x: number
    y: number
    w: number
    h: number
  }
}
// #endregion

// #region Final
export interface DataChampion extends DataCustomChampion, LolDataChampion {}
// #endregion

export const resolveChampionId = (idLol: string) => {
  let result = idLol.substring(6).toUpperCase()
  return result
}

export const mergeChampions = (
  championsCustom: Record<string, DataCustomChampion>, 
  championsLol: Record<string, LolDataChampion>, 
): Record<string, DataChampion> => {
  const result = {}
  const keysCustom = Object.keys(championsCustom)
  const keysLol = Object.keys(championsLol)
  const keysLolFormatted = keysLol.map(resolveChampionId)
  // Log missing lol
  keysCustom.forEach((keyCustom) => {
    if (!keysLolFormatted.includes(keyCustom)) {
      console.warn(`Missing Lol Champion Data: ${keyCustom}`)
    }
  })
  // Log missing custom
  keysLol.forEach((keyLol) => {
    if (!keysCustom.includes(keyLol)) {
      console.warn(`Missing Custom Champion Data: ${keyLol}`)
    }
  })
  // Merge shared
  const classes = new Set()
  const origins = new Set()
  keysLol.forEach((keyLol) => {
    const keyLolFormatted = resolveChampionId(keyLol)
    if (keysCustom.includes(keyLolFormatted)) {
      const championCustom = championsCustom[keyLolFormatted]
      const championLol = championsLol[keyLol]
      championCustom.classes.forEach(c => classes.add(c))
      championCustom.origins.forEach(c => origins.add(c))
      result[keyLolFormatted] = {
        ...championLol,
        ...championCustom,
      }
    }
  })
  console.log('CLASSES')
  console.log(classes)
  console.log('ORIGINS')
  console.log(origins)

  return result
}