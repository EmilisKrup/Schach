import { bewegeFigur,  abgewaehltFeld, ausgewaehltFeld,  istInUmwandlung, bewegbareFelder } from "./board.js"
import type { Position, Spielzug } from "./types.js"
import { istSchachmatt, figurAn } from "./pruefen.js"
const containers = document.getElementById("brett")
const dialog = document.getElementById("alert") as HTMLDialogElement | null;
const resultat = document.getElementById("resultat") as HTMLParagraphElement | null;
 
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
    if(istInUmwandlung)return
    const zeile = Number(feld.dataset.zeile)
    const spalte = Number(feld.dataset.spalte)
    if (Number.isNaN(zeile) || Number.isNaN(spalte)) return
    const position: Position = { zeile, spalte }
 
    if (ausgewaehlt === null) {
      if (figurAn(position) && figurAn(position)?.farbe === amSpielzug) ausgewaehlt = position
      if(ausgewaehlt != null && containers){
        ausgewaehltFeld(containers, ausgewaehlt)
        bewegbareFelder(ausgewaehlt, container, 1)  
      }
      return
    }
    if (ausgewaehlt.zeile !== zeile || ausgewaehlt.spalte !== spalte) {
      if(bewegeFigur(ausgewaehlt, position)){
      neuZeichnen()
      
      if(amSpielzug==="weiss"){
       if(istSchachmatt("schwarz")===1 && dialog && resultat){ 
        resultat.textContent ="Weiß hat gewonnen"
        dialog.show()
        controller.abort();
       }
       if(istSchachmatt("schwarz")===2 && dialog && resultat){
       resultat.textContent ="Patt"
       dialog.show()
       controller.abort();
    }
      amSpielzug="schwarz" 
      } else{
        if(istSchachmatt("weiss")===1 && dialog && resultat){ 
        resultat.textContent ="Schwarz hat gewonnen"
        dialog.show()
        controller.abort();
        }if(istSchachmatt("weiss")===2 && dialog && resultat){
        resultat.textContent ="Patt"
        dialog.show()
        controller.abort();
    }
       amSpielzug="weiss"
        
      }
    }
  }
    if(containers){
      abgewaehltFeld(containers, ausgewaehlt)
      bewegbareFelder(ausgewaehlt, container, 0)
    }
     ausgewaehlt = null
  },
    {signal: controller.signal} 
  )
}

 
   
 