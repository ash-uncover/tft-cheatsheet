export interface ChampionData {
  id: string
  name: string
  tier:  1 | 2 | 3 | 4 | 5
  origins: string[]
  classes: string[]
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