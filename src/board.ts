import { /*Bauer,*/ type Brett, type Farbe, type Feld, type Figur, type FigurType, type Position, type Rochade } from "./types.js"
import { turmMove, bauerMove ,laeuferMove, springerMove, dameMove, koenigMove, gehtRochade } from "./regel.js"
 
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

export function istSchachmatt(farbe: Farbe): number | null{
  let geht: number | null =  null
    brett.forEach((reihe, zeile) => {
      reihe.forEach((figur: Feld, spalte)=>{
        if(figur?.farbe===farbe){
          for(let h = 0; h<=7; h++){
            for(let i = 0; i<=7; i++){
            if(legalerZug({zeile,spalte},{zeile:h,spalte:i}) && regelnErfuellt({zeile,spalte},{zeile:h,spalte:i}) )geht = 0
            }
          }
        }
      })
    })
  if(imSchach(farbe) && geht === null){return 1}
    if(!imSchach(farbe) && geht === null){return 2}
  return geht
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
export function bauerUmwandlung(containerUm: HTMLElement, ausgewaehlt: Position ,containerBr: HTMLElement): void{
  if(figurAn(ausgewaehlt)?.typ!== "B") return
  istInUmwandlung = true
  containerUm.innerHTML = ""
  for(let h=0;h<4;h++){
    const feldDiv = document.createElement("div")
    feldDiv.classList.add("feld", h % 2 === 0 ? "hell" : "dunkel")
    if(h===0){
      if(figurAn(ausgewaehlt)?.farbe==="weiss"){
      feldDiv.textContent = SYMBOLE["weiss"]["D"]
      
      }
      else{
      feldDiv.textContent = SYMBOLE["schwarz"]["D"]
      }
    }
    if(h===1){
      if(figurAn(ausgewaehlt)?.farbe==="weiss"){
      feldDiv.textContent = SYMBOLE["weiss"]["T"]
      }
      else{
      feldDiv.textContent = SYMBOLE["schwarz"]["T"]
      }
    }
    if(h===2){
      if(figurAn(ausgewaehlt)?.farbe==="weiss"){
      feldDiv.textContent = SYMBOLE["weiss"]["L"]
      }
      else{
      feldDiv.textContent = SYMBOLE["schwarz"]["L"]
      }
    }
    if(h===3){
      if(figurAn(ausgewaehlt)?.farbe==="weiss"){
      feldDiv.textContent = SYMBOLE["weiss"]["S"]
      }
      else{
      feldDiv.textContent = SYMBOLE["schwarz"]["S"]
      }
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
    if(figurAn(ausgewaehlt)?.farbe==="weiss"){
    if(istSchachmatt("schwarz")===1){
      console.log("weiß hat gewonnen")
    }
    if(istSchachmatt("schwarz")===2){
      console.log("patt")
    }
}
else{if(istSchachmatt("weiss")===1){
      console.log("schwarz hat gewonnen")
}
    if(istSchachmatt("weiss")===2){
      console.log("patt")
    }
}
   istInUmwandlung = false
   
    containerUm.removeEventListener("click", promotionHandler!)
        promotionHandler = null
    zeichneBrett(containerBr)
}
}
export type { Figur }