import { /*Bauer,*/ type Brett, type Farbe, type Feld, type Figur, type FigurType, type Position } from "./types.js"
import { turmMove, bauerMove ,laeuferMove, springerMove, dameMove, koenigMove } from "./regel.js"
 
export const brett: Brett = startBrett()
 
export function startBrett(): Brett {
  const reihenfolge: FigurType[] = ["T", "S", "L", "D", "K", "L", "S", "T"]
  const neu: Brett = []
  for (let zeile = 0; zeile < 8; zeile++) {
    const reihe: Feld[] = []
    for (let spalte = 0; spalte < 8; spalte++) {
      const typ = reihenfolge[spalte]
      if (typ === undefined) throw new Error("Spalte außerhalb des Bretts")
      if (zeile === 0) reihe.push({ typ, farbe: "schwarz" })
      else if (zeile === 1) reihe.push({ typ: "B", farbe: "schwarz" })    //new Bauer( "B", "schwarz")
      else if (zeile === 6) reihe.push({ typ: "B", farbe: "weiss" })
      else if (zeile === 7) reihe.push({ typ, farbe: "weiss" })
      else reihe.push(null)
    }
    neu.push(reihe)
  }
  return neu
}
export function neuesSpiel(): void {
  brett.splice(0, brett.length, ...startBrett())
}
 
export function figurAn({ zeile, spalte }: Position): Feld {
  return brett[zeile]?.[spalte] ?? null
}

export function regelnErfuellt(von: Position, nach: Position): boolean {
  const figur = figurAn(von)
  if (!figur) return false

  const regeln = {
    B: bauerMove,
    T: turmMove,
    L: laeuferMove,
    S: springerMove,
    D: dameMove,
    K: koenigMove,
  }
  return regeln[figur.typ](von, nach)
}

export function wirdAngegriffen(ziel: Position, angreiferFarbe: Farbe): boolean{
  let geht: boolean = false
  brett.forEach((reihe, zeile) => {
      reihe.forEach((figur: Feld, spalte)=>{
        if(figur?.farbe === angreiferFarbe){
          if(regelnErfuellt({zeile,spalte}, ziel)) geht = true
        }
      })
  })
  return geht
}

export function legalerZug(von: Position, nach: Position){
  const figur = figurAn(von)
  const vonReihe = brett[von.zeile]
  const nachReihe = brett[nach.zeile]
   if (!figur || !vonReihe || !nachReihe) return false
  const geschlagen= nachReihe[nach.spalte] ?? null
  nachReihe[nach.spalte] = figur
  vonReihe[von.spalte] = null
  const imschach = imSchach(figur.farbe)
vonReihe[von.spalte] = figur        
nachReihe[nach.spalte] = geschlagen
return !imschach

}

export function imSchach(farbe: Farbe): boolean{
  let h: boolean = false
  let koenigPos: Position | null = findeKoenig(farbe)
  if(koenigPos != null && farbe === "weiss"){
    if(wirdAngegriffen(koenigPos, "schwarz"))h = true
  }
  else{if(koenigPos != null && wirdAngegriffen(koenigPos, "weiss"))h = true
  }
  return h
}

export function istSchachmatt(farbe: Farbe): boolean{
  let geht: boolean = false
  if(imSchach(farbe)){
    brett.forEach((reihe, zeile) => {
      reihe.forEach((figur: Feld, spalte)=>{
        if(figur){
          for(let h = 0; h<=7; h++){
            for(let i = 0; i<=7; i++)
            if(legalerZug({zeile,spalte},{zeile:h,spalte:i}))geht = true
          }
        }
      })
    })
  }
  return geht
}
 
export function bewegeFigur(von: Position, nach: Position): boolean {
 if (!legalerZug(von, nach)) return false
 if (!regelnErfuellt(von,nach)) return false
 
 const figur = figurAn(von)

  const vonReihe = brett[von.zeile]
  const nachReihe = brett[nach.zeile]
  if (!figur || !vonReihe || !nachReihe) return false
  nachReihe[nach.spalte] = figur
  vonReihe[von.spalte] = null
  return true
}

export function findeKoenig(farbe: Farbe): Position | null{
let woKoenig: Position | null = null
  brett.forEach((reihe, zeile) => {
    reihe.forEach((figur: Feld, spalte)=>{
      if(figur === figurAn({zeile, spalte}) && figur?.typ==="K" && figur?.farbe===farbe){
        woKoenig = {zeile, spalte}
      }
    })
  })
  return woKoenig
}
const SYMBOLE: Record<Farbe, Record<FigurType, string>> = {
  weiss:   { K: "♔", D: "♕", T: "♖", L: "♗", S: "♘", B: "♙" },
  schwarz: { K: "♚", D: "♛", T: "♜", L: "♝", S: "♞", B: "♟" },
}
 
export function zeichneBrett(container: HTMLElement): void {
  container.innerHTML = ""
  brett.forEach((reihe, zeile) => {
    reihe.forEach((figur: Feld, spalte) => {
      const feldDiv = document.createElement("div")
      feldDiv.classList.add("feld", (zeile + spalte) % 2 === 0 ? "hell" : "dunkel")
      feldDiv.dataset.zeile = String(zeile)
      feldDiv.dataset.spalte = String(spalte)
      if (figur) feldDiv.textContent = SYMBOLE[figur.farbe][figur.typ]
      container.appendChild(feldDiv)
    })
  })
}

export function ausgewaehltFeld(container: HTMLElement, ausgewaehlt: Position): void {
   let zeile = ausgewaehlt.zeile
   let spalte = ausgewaehlt.spalte
   const feldZeile = container.querySelector(`[data-zeile="${String(zeile)}"][data-spalte="${String(spalte)}"]`)

   if (figurAn(ausgewaehlt) && feldZeile){
      feldZeile?.classList.add("gruen")
      }
     }

export function abgewaehltFeld(container: HTMLElement, ausgewaehlt: Position): void {
   let zeile = ausgewaehlt.zeile
   let spalte = ausgewaehlt.spalte
   const feldZeile = container.querySelector(`[data-zeile="${String(zeile)}"][data-spalte="${String(spalte)}"]`)

   if (figurAn(ausgewaehlt) && feldZeile){
      feldZeile?.classList.remove("gruen")
      }
     }     

export type { Figur }