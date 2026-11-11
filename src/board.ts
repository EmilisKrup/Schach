import { /*Bauer,*/ type Brett, type Farbe, type Feld, type Figur, type FigurType, type Position, type Rochade } from "./types.js"
import {gehtRochade } from "./regel.js"
import { figurAn, regelnErfuellt, legalerZug, istSchachmatt } from "./pruefen.js"
const dialog = document.getElementById("alert") as HTMLDialogElement | null;
const resultat = document.getElementById("resultat") as HTMLParagraphElement | null;
 
const containerW = document.getElementById("bauerUmWeiss")
const containerS = document.getElementById("bauerUmSchwarz")
const container = document.getElementById("brett")
export let istInUmwandlung = false
export let rochade: Rochade = {
    turmWA: true,
    turmWH: true,
    turmSA: true,
    turmSH: true
}
export const brett: Brett = startBrett()
let promotionHandler: ((event: MouseEvent) => void) | null = null
 
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
 


 
export function bewegeFigur(von: Position, nach: Position): boolean {
 if (!legalerZug(von, nach)) return false
 if (!regelnErfuellt(von,nach)) return false
 const figur = figurAn(von)
 let rochieren: boolean = gehtRochade(von)
if(figur?.typ === "K" && Math.abs(nach.spalte - von.spalte) === 2){
  if(!rochieren) return false
}
  const vonReihe = brett[von.zeile]
  const nachReihe = brett[nach.zeile]
  if (!figur || !vonReihe || !nachReihe) return false
  nachReihe[nach.spalte] = figur
  vonReihe[von.spalte] = null
rochadeBewegen(von, nach, rochieren)
  if(figur?.typ === "B" && figur.farbe === "weiss" && nach.zeile===0){
  
  if(containerW && container){
    bauerUmwandlung(containerW, nach, container)}
}
if(figur?.typ === "B" && figur.farbe === "schwarz"&& nach.zeile===7){
  if(containerS && container){
    
    bauerUmwandlung(containerS, nach, container)}
}
  return true
}

function rochadeBewegen(von:Position, nach: Position, rochadeGeht: boolean): void{
    const figur = figurAn(nach)
  if(figur?.typ === "K"){
    if( Math.abs(nach.spalte - von.spalte) === 2){
      console.log("hi")
    if(rochadeGeht){
      console.log("hi")
      if(figur?.farbe === "schwarz"){
        const vonTReihe = brett[0]
        const nachTReihe = brett[0]
        if(figurAn({zeile:0,spalte:0})?.typ==="T" && nach.spalte === 2){
          const figurT = figurAn({zeile:0,spalte:0})
          if (!figurT || !vonTReihe || !nachTReihe) return 
          console.log("hi")
          nachTReihe[3] = figurT
          vonTReihe[0] = null
          rochade.turmSA = false
          rochade.turmSH = false
        }
        if(figurAn({zeile:0,spalte:7})?.typ==="T" && nach.spalte === 6){
          const figurT = figurAn({zeile:0,spalte:7})
          if (!figurT || !vonTReihe || !nachTReihe) return 
          nachTReihe[5] = figurT
          vonTReihe[7] = null
          rochade.turmSH = false
          rochade.turmSA = false
        }
    } 
      if(figur?.farbe === "weiss"){
        const vonTReihe = brett[7]
        const nachTReihe = brett[7]
        if(figurAn({zeile:7,spalte:0})?.typ==="T" && nach.spalte === 2){
          const figurT = figurAn({zeile:7,spalte:0})
          if (!figurT || !vonTReihe || !nachTReihe) return 
          nachTReihe[3] = figurT
          vonTReihe[0] = null
          rochade.turmWA = false
          rochade.turmWH = false
        }
        if(figurAn({zeile:7,spalte:7})?.typ==="T" && nach.spalte === 6){
          const figurT = figurAn({zeile:7,spalte:7})
          if (!figurT || !vonTReihe || !nachTReihe) return 
          nachTReihe[5] = figurT
          vonTReihe[7] = null
          rochade.turmWH = false
          rochade.turmWA = false
        }
    } 
    }
  }
if(figur?.farbe === "weiss"){
  rochade.turmWH = false
  rochade.turmWA = false
}
if(figur?.farbe === "schwarz"){
  rochade.turmSH = false
  rochade.turmSA = false
}


}
if(figur?.farbe === "schwarz"){
        if(von.zeile === 0 && von.spalte === 0)rochade.turmSA = false
        if(von.zeile === 0 && von.spalte === 7)rochade.turmSH = false
    } 
  if(figur?.farbe === "weiss"){
        if(von.zeile === 7 && von.spalte === 0)rochade.turmWA = false
        if(von.zeile === 7 && von.spalte === 7)rochade.turmWH = false
    } 

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
export function bauerUmwandlung(containerUm: HTMLElement, ausgewaehlt: Position ,containerBr: HTMLElement): void{
  if(figurAn(ausgewaehlt)?.typ!== "B") return
  istInUmwandlung = true
  containerUm.innerHTML = ""
  for(let h=0;h<4;h++){
    const feldDiv = document.createElement("div")
    feldDiv.classList.add("feld", h % 2 === 0 ? "hell" : "dunkel")
    if(h===0){
      figurAn(ausgewaehlt)?.farbe==="weiss" ? 
      feldDiv.textContent = SYMBOLE["weiss"]["D"] : feldDiv.textContent = SYMBOLE["schwarz"]["D"]
    }
    if(h===1){
      figurAn(ausgewaehlt)?.farbe==="weiss"? 
      feldDiv.textContent = SYMBOLE["weiss"]["T"] : feldDiv.textContent = SYMBOLE["schwarz"]["T"]
    }
    if(h===2){
      figurAn(ausgewaehlt)?.farbe==="weiss"? 
      feldDiv.textContent = SYMBOLE["weiss"]["L"] : feldDiv.textContent = SYMBOLE["schwarz"]["L"]
    }
    if(h===3){
      figurAn(ausgewaehlt)?.farbe==="weiss"? 
      feldDiv.textContent = SYMBOLE["weiss"]["S"] : feldDiv.textContent = SYMBOLE["schwarz"]["S"]
    }
    containerUm.appendChild(feldDiv)
  }
   if (promotionHandler !== null) {
        containerUm.removeEventListener("click", promotionHandler)
    }
     promotionHandler = promotebauer
     containerUm.addEventListener("click", promotionHandler)

  function promotebauer(event: MouseEvent,) {
    const nachUm = brett[ausgewaehlt.zeile]
    if(!nachUm)return
    const ziel = event.target
    if (!(ziel instanceof HTMLElement)) return
    const feld = ziel.closest<HTMLElement>(".feld")
    if (!feld) return
    if(feld.dataset.zeile != null)return
    if(feld.textContent === SYMBOLE["weiss"]["D"]){
      let figur: Figur ={typ:"D",farbe:"weiss"}
       nachUm[ausgewaehlt.spalte]= figur
    }
    if(feld.textContent === SYMBOLE["schwarz"]["D"]){
      let figur: Figur ={typ:"D",farbe:"schwarz"}
       nachUm[ausgewaehlt.spalte]= figur
    }
    if(feld.textContent === SYMBOLE["weiss"]["T"]){
      let figur: Figur ={typ:"T",farbe:"weiss"}
       nachUm[ausgewaehlt.spalte]= figur
    }
    if(feld.textContent === SYMBOLE["schwarz"]["T"]){
      let figur: Figur ={typ:"T",farbe:"schwarz"}
       nachUm[ausgewaehlt.spalte]= figur
    }
    if(feld.textContent === SYMBOLE["weiss"]["L"]){
      let figur: Figur ={typ:"L",farbe:"weiss"}
       nachUm[ausgewaehlt.spalte]= figur
    }
    if(feld.textContent === SYMBOLE["schwarz"]["L"]){
      let figur: Figur ={typ:"L",farbe:"schwarz"}
       nachUm[ausgewaehlt.spalte]= figur
    }
    if(feld.textContent === SYMBOLE["weiss"]["S"]){
      let figur: Figur ={typ:"S",farbe:"weiss"}
       nachUm[ausgewaehlt.spalte]= figur
    }
    if(feld.textContent === SYMBOLE["schwarz"]["S"]){
      let figur: Figur ={typ:"S",farbe:"schwarz"}
       nachUm[ausgewaehlt.spalte]= figur
    }
  
    containerUm.innerHTML = ""
    if(!dialog || !resultat) return
    if(figurAn(ausgewaehlt)?.farbe==="weiss"){
    if(istSchachmatt("schwarz")===1){
       resultat.textContent ="Weiß hat gewonnen"
        dialog.show()
    }
    if(istSchachmatt("schwarz")===2){
       resultat.textContent ="Patt"
        dialog.show()
    }
}
else{if(istSchachmatt("weiss")===1){
       resultat.textContent ="Schwarz hat gewonnen"
        dialog.show()
}
    if(istSchachmatt("weiss")===2){
       resultat.textContent ="Patt"
        dialog.show()
    }
}
   istInUmwandlung = false
   
    containerUm.removeEventListener("click", promotionHandler!)
        promotionHandler = null
    zeichneBrett(containerBr)
}
}

export function bewegbareFelder(ausgewaehlt: Position, container: HTMLElement, zustand: number):void{
  brett.forEach((reihe, zeile) => {
    reihe.forEach((figur: Feld, spalte) => {
      if(legalerZug(ausgewaehlt,{zeile: zeile, spalte: spalte}) && regelnErfuellt(ausgewaehlt,{zeile: zeile, spalte: spalte})){
        const feldZeile = container.querySelector(`[data-zeile="${String(zeile)}"][data-spalte="${String(spalte)}"]`)
        if(figur && figur.farbe != figurAn(ausgewaehlt)?.farbe && zustand === 1){
          const kreis = document.createElement("div");
           kreis.classList.add("rot");
           feldZeile?.appendChild(kreis);
        }
        else{ if(!figur && zustand === 1){
          const kreis = document.createElement("div");
           kreis.classList.add("hellrot");
           feldZeile?.appendChild(kreis);
        }
      }
      if(zustand === 0){
        const kreis = feldZeile?.querySelector(".rot, .hellrot");
        kreis?.remove();
      }
      }
    })
  })
}

export type { Figur }