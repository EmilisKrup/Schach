import type { Position } from "./types.js"
import { figurAn } from "./board.js"

export function bauerMove(von: Position, nach: Position): boolean{
    const figur = figurAn(von)
    let geht: boolean =false
    if(figur?.typ==="B" && figur?.farbe ==="weiss"){
                      if(nach.zeile <= von.zeile - 3)return geht
                      if(von.zeile!=6 && nach.zeile <= von.zeile - 2) return geht
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
        if(figur?.typ==="T" && figur?.farbe ==="weiss"){
            if (nach.spalte != von.spalte && nach.zeile != von.zeile)return geht
                let h = structuredClone(von)
                h.zeile -= 1
                while(h.zeile>nach.zeile){
                    if(figurAn(h))return geht
                    h.zeile -= 1
                }
                h = structuredClone(von)
                h.zeile += 1
                while(h.zeile<nach.zeile){
                    if(figurAn(h))return geht
                     h.zeile += 1
                }
                h = structuredClone(von)
                h.spalte -= 1
                while(h.spalte>nach.spalte){
                    if(figurAn(h))return geht
                    h.spalte -= 1
                }
                h = structuredClone(von)
                h.spalte += 1
                while(h.spalte<nach.spalte){
                    if(figurAn(h))return geht
                     h.spalte += 1
                }
                if(figurAn(nach)){
                    if(figurAn(nach)?.farbe=="weiss")return geht
                }
            }
            if(figur?.typ==="T" && figur?.farbe ==="schwarz"){
            if (nach.spalte != von.spalte && nach.zeile != von.zeile)return geht
                let h = structuredClone(von)
                h.zeile -= 1
                while(h.zeile>nach.zeile){
                    if(figurAn(h))return geht
                    h.zeile -= 1
                }
                h = structuredClone(von)
                h.zeile += 1
                while(h.zeile<nach.zeile){
                    if(figurAn(h))return geht
                     h.zeile += 1
                }
                h = structuredClone(von)
                h.spalte -= 1
                while(h.spalte>nach.spalte){
                    if(figurAn(h))return geht
                    h.spalte -= 1
                }
                h = structuredClone(von)
                h.spalte += 1
                while(h.spalte<nach.spalte){
                    if(figurAn(h))return geht
                     h.spalte += 1
                }
                if(figurAn(nach)){
                    if(figurAn(nach)?.farbe=="schwarz")return geht
                }
            }
    return geht = true
}

/*export function läuferMove(von: Position, nach: Position): boolean{
    const figur = figurAn(von)
    let geht: boolean =false
        if(figur?.typ==="T" && figur?.farbe ==="weiss"){

    }
    return geht = true
}
    /*