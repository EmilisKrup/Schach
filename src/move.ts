import { bewegeFigur, figurAn, abgewaehltFeld, ausgewaehltFeld, istSchachmatt } from "./board.js"
import type { Position, Spielzug } from "./types.js"
const containers = document.getElementById("brett")
 
let ausgewaehlt: Position | null = null
let amSpielzug: Spielzug = "weiss"
export function auswahlLoeschen(): void {
  ausgewaehlt = null
}
 
export function initKlicks(container: HTMLElement, neuZeichnen: () => void): void {
  const controller = new AbortController();
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
      if (figurAn(position) && figurAn(position)?.farbe === amSpielzug) ausgewaehlt = position
      console.log(ausgewaehlt)
      if(ausgewaehlt != null && containers)ausgewaehltFeld(containers, ausgewaehlt)
      return
    }
    if (ausgewaehlt.zeile !== zeile || ausgewaehlt.spalte !== spalte) {
      if(bewegeFigur(ausgewaehlt, position)){
      neuZeichnen()
      
      if(amSpielzug==="weiss"){
       if(istSchachmatt("schwarz")){ 
        console.log("weiß hat gewonnen")
        controller.abort();
       }
      amSpielzug="schwarz" 
      } else{
        if(istSchachmatt("weiss")){ 
        console.log("schwarz hat gewonnen")
        controller.abort();
        }
       amSpielzug="weiss"
        
      }
    }
  }
    if(containers)abgewaehltFeld(containers, ausgewaehlt)
     ausgewaehlt = null
  },
    {signal: controller.signal} 
  )
}

 
   
 