import { turmMove, bauerMove ,laeuferMove, springerMove, dameMove, koenigMove} from "./regel.js"
import {type Farbe, type Feld, type Position} from "./types.js"
import {brett} from "./board.js"



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
export function figurAn({ zeile, spalte }: Position): Feld {
  return brett[zeile]?.[spalte] ?? null
}
