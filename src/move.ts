import { bewegeFigur, figurAn } from "./board.js"
import type { Position } from "./types.js"
 
let ausgewaehlt: Position | null = null
 
export function auswahlLoeschen(): void {
  ausgewaehlt = null
}
 
export function initKlicks(container: HTMLElement, neuZeichnen: () => void): void {
  container.addEventListener("click", (event: MouseEvent) => {
    const ziel = event.target
    if (!(ziel instanceof HTMLElement)) return
    const feld = ziel.closest<HTMLElement>(".feld")
    if (!feld) return
 
    const zeile = Number(feld.dataset.zeile)
    const spalte = Number(feld.dataset.spalte)
    if (Number.isNaN(zeile) || Number.isNaN(spalte)) return
    const position: Position = { zeile, spalte }
 
    if (ausgewaehlt === null) {
      if (figurAn(position)) ausgewaehlt = position   
      return
    }
    if (ausgewaehlt.zeile !== zeile || ausgewaehlt.spalte !== spalte) {
      bewegeFigur(ausgewaehlt, position)
      neuZeichnen()
    }
    ausgewaehlt = null
  })
}
 