export interface DataOrigin {
  id: string
  name: string
  bonus: {
    bronze: number
    gold: number
    platinium?: number
    emerald?: number
    diamond?: number
  }
}