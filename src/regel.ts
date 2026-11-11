import type { Position } from "./types.js"
import { rochade} from "./board.js"
import {figurAn, wirdAngegriffen} from "./pruefen.js"



export function bauerMove(von: Position, nach: Position): boolean{
    const figur = figurAn(von)
    let geht: boolean =false
    if(Math.abs(nach.spalte - von.spalte) > 1) return geht
    if(figur?.typ==="B" && figur?.farbe ==="weiss"){
                      if(nach.zeile <= von.zeile - 3)return geht
                      if(von.zeile!=6 && nach.zeile <= von.zeile - 2) return geht
                      if(von.zeile===6){
                        if(!figurenUeberspringen(von, nach)) return geht
                      }
                      if(figurAn(nach)){
                          if(figurAn(nach)?.farbe=="weiss")return geht
                          if(nach.zeile != von.zeile-1 && nach.spalte != von.spalte+1)return geht
                          if(nach.zeile != von.zeile-1 && nach.spalte != von.spalte-1)return geht
                          if(nach.zeile == von.zeile-1 && nach.spalte == von.spalte)return geht
                      }
                      if(!figurAn(nach)){
                            if(nach.spalte != von.spalte)return geht 
                            if (von.zeile <=nach.zeile) return geht
                      } 
                    }
                  if(figur?.typ==="B" && figur?.farbe ==="schwarz"){
                      if(nach.zeile >= von.zeile + 3) return geht
                      if(von.zeile!=1 && nach.zeile >= von.zeile + 2) return geht
                      if(von.zeile===1){
                        if(!figurenUeberspringen(von, nach)) return geht
                    }
                      if(figurAn(nach)){
                          if(figurAn(nach)?.farbe=="schwarz")return geht
                          if(nach.zeile != von.zeile+1 && nach.spalte!=von.spalte+1)return geht
                          if(nach.zeile != von.zeile+1 && nach.spalte!=von.spalte-1)return geht
                          if(nach.zeile == von.zeile+1 && nach.spalte == von.spalte)return geht
                      }
                      if(!figurAn(nach)){
                          if(nach.spalte != von.spalte)return geht
                      }
                      if (von.zeile >=nach.zeile) return geht
                  }
    return geht = true
}

export function turmMove(von: Position, nach: Position): boolean{   
const figur = figurAn(von)
    let geht: boolean =false
            if (nach.spalte != von.spalte && nach.zeile != von.zeile)return geht
                if(!figurenUeberspringen(von, nach)) return geht
            if (figurAn(nach)?.farbe === figur?.farbe) return geht
                
    return geht = true
}

export function laeuferMove(von: Position, nach: Position): boolean{
    const figur = figurAn(von)
    let geht: boolean =false
    const diffZ = Math.abs(nach.zeile - von.zeile)
    const diffS = Math.abs(nach.spalte - von.spalte)
    if(diffZ != diffS) return geht
    
    if(!figurenUeberspringen(von, nach))return geht

        if (figurAn(nach)?.farbe === figur?.farbe) return geht
    return geht = true  
}

export function springerMove(von: Position, nach: Position): boolean{
    const figur = figurAn(von)
    let geht: boolean =false
    const diffZ = Math.abs(nach.zeile - von.zeile)
    const diffS = Math.abs(nach.spalte - von.spalte)
    if(diffS>=3 || diffZ >= 3)return geht
    if(diffS===1 && diffZ===1) return geht
    if(diffS===0 || diffZ===0) return geht
    if(diffZ===2){
        if(diffS!=1)return geht
    }
    else{
        if(diffZ!=1)return geht
    }
    if (figurAn(nach)?.farbe === figur?.farbe) return geht
    return geht = true
}

export function dameMove(von: Position, nach: Position): boolean{
    const figur = figurAn(von)
    let geht: boolean =false
    const diffZ = Math.abs(nach.zeile - von.zeile)
    const diffS = Math.abs(nach.spalte - von.spalte)
    if(diffZ != diffS && nach.spalte != von.spalte && nach.zeile != von.zeile) return geht
    if(!figurenUeberspringen(von, nach))return geht
    if (figurAn(nach)?.farbe === figur?.farbe) return geht

return geht = true
}

export function koenigMove(von: Position, nach: Position): boolean{
    const figur = figurAn(von)
    let geht: boolean =false
    const diffZ = Math.abs(nach.zeile - von.zeile)
    const diffS = Math.abs(nach.spalte - von.spalte)
    if(!figurenUeberspringen(von, nach))return geht
    if (figurAn(nach)?.farbe === figur?.farbe) return geht
    if(diffZ>=2 || diffS>=2){
        if(diffZ === 0 && diffS === 2){
           if(figur?.farbe === "weiss"){
            if(rochade.turmWH === false) return geht
            if(rochade.turmWA === false) return geht
            }
            if(figur?.farbe === "schwarz"){
            if(rochade.turmSH === false) return geht
            if(rochade.turmSA === false) return geht
            }
        }
        else return geht
    }
return geht = true
}

export function gehtRochade(von: Position): boolean{
    const figur = figurAn(von)
    let geht: boolean = false
    if(figur?.farbe === "schwarz"){
        if(rochade.turmSA === true){
            let h = structuredClone(von)
            for(h;h.spalte>=2; h.spalte--){
                if(wirdAngegriffen(h, "weiss"))return geht
            }
            return geht =true        
    }
        if(rochade.turmSH === true){ 
            let h = structuredClone(von)
            for(h;h.spalte<=6; h.spalte++){
                if(wirdAngegriffen(h, "weiss"))return geht
            }
            return geht = true
    }
}
    if(figur?.farbe === "weiss"){
        if(rochade.turmWA === true){
            let h = structuredClone(von)
            for(h;h.spalte>=2; h.spalte--){
                if(wirdAngegriffen(h, "schwarz"))return geht
            }
            
            return geht =true
    }
        if(rochade.turmWH === true){
            let h = structuredClone(von)
            for(h;h.spalte<=6; h.spalte++){
                if(wirdAngegriffen(h, "schwarz"))return geht
            }
            return geht = true
        }
    }
    return geht
}

function figurenUeberspringen(von: Position, nach: Position): boolean{
    const diffZ = Math.abs(nach.zeile - von.zeile)
    const diffS = Math.abs(nach.spalte - von.spalte)
    if(figurAn(von)?.typ ==="D" || figurAn(von)?.typ ==="L"){
        if(diffS === diffZ){
            let h = structuredClone(von)
        h.spalte -=1
        h.zeile -= 1
        while(h.zeile>nach.zeile && h.spalte>nach.spalte){
            if(figurAn(h))return false
            h.spalte -= 1
            h.zeile -= 1
        }
        h = structuredClone(von)
        h.spalte +=1
        h.zeile -= 1
        while(h.zeile>nach.zeile && h.spalte<nach.spalte){
            if(figurAn(h))return false
            h.spalte += 1
            h.zeile -= 1
        }
        h = structuredClone(von)
        h.spalte -=1
        h.zeile += 1
        while(h.zeile<nach.zeile && h.spalte>nach.spalte){
            if(figurAn(h))return false
            h.spalte -= 1
            h.zeile += 1
        }
        h = structuredClone(von)
        h.spalte +=1
        h.zeile += 1
        while(h.zeile<nach.zeile && h.spalte<nach.spalte){
            if(figurAn(h))return false
            h.spalte += 1
            h.zeile += 1
        }
        return true
        }
    }
        if(figurAn(von)?.typ ==="D" || figurAn(von)?.typ ==="T" || figurAn(von)?.typ ==="B" || figurAn(von)?.typ=== "K"){
        let h = structuredClone(von)
        h.zeile -= 1
        while(h.zeile>nach.zeile){
            if(figurAn(h))return false
            h.zeile -= 1
        }
        h = structuredClone(von)
        h.zeile += 1
        while(h.zeile<nach.zeile){
            if(figurAn(h))return false
            h.zeile += 1
        }
        h = structuredClone(von)
        h.spalte -= 1
        while(h.spalte>nach.spalte){
            if(figurAn(h))return false
            h.spalte -= 1
        }
        h = structuredClone(von)
        h.spalte += 1
        while(h.spalte<nach.spalte){
            if(figurAn(h))return false
            h.spalte += 1
        }
        return true
    }
    return false
}
