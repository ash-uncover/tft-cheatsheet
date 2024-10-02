export interface DataItem {
  id: string
  name: string
  image: string
  bonus: any
  passive: string
  ingredients?: [string, string]
}