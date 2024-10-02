export interface ChampionsState {
  championHover: ChampionActiveState | null
  championSelected: ChampionActiveState | null
  classeHover: TraitActiveState | null
  classeSelected: TraitActiveState | null
  originHover: TraitActiveState | null
  originSelected: TraitActiveState | null
}

export interface ChampionActiveState {
  id: string
  origins: string[]
  classes: string[]
}
export interface TraitActiveState {
  id: string
}