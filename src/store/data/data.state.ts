import { DataChampion } from "src/lib/model/DataChampion"

export interface DataState {
  status: any
  error: any
  
  builds: any
  champions: Record<string, DataChampion>
  classes: any
  compos: any
  items: any
  origins: any
}