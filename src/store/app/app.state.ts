export interface AppState {
  championHover: ChampionActiveState | null
  championSelected: ChampionActiveState | null
  classeHover: TraitActiveState | null
  classeSelected: TraitActiveState | null
  originHover: TraitActiveState | null
  originSelected: TraitActiveState | null
  
  itemHover: any
  itemSelected: any
}

export interface ChampionActiveState {
  id: string
  origins: string[]
  classes: string[]
}
export interface TraitActiveState {
  id: string
}