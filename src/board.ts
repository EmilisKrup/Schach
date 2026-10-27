import type { Brett, Farbe, Feld, Figur, FigurType, Position } from "./types.js"
import { turmMove, bauerMove /*,läuferMove*/ } from "./regel.js"
 
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
      else if (zeile === 1) reihe.push({ typ: "B", farbe: "schwarz" })
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
 
export function bewegeFigur(von: Position, nach: Position): void {
 const figur = figurAn(von)
 if(figur?.typ=="B"){
  if(bauerMove(von,nach)==false)return
 }
 if(figur?.typ=="T"){
  if(turmMove(von,nach)==false)return
 }
 if(figur?.typ=="L"){
  if(turmMove(von,nach)==false)return
 }
     
  const vonReihe = brett[von.zeile]
  const nachReihe = brett[nach.zeile]
  console.log(von)
  if (!figur || !vonReihe || !nachReihe) return
  nachReihe[nach.spalte] = figur
  vonReihe[von.spalte] = null
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
export type { Figur }