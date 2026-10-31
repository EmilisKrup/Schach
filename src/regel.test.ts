import { describe, it, expect, beforeEach } from "vitest"
import { brett, neuesSpiel } from "./board.js"
import { bauerMove, springerMove, turmMove } from "./regel.js"
import type { Feld } from "./types.js"

function setze(zeile: number, spalte: number, figur: Feld): void{
    const reihe = brett[zeile]
  if (reihe) reihe[spalte] = figur
}

beforeEach(() => neuesSpiel())

describe("Bauer (weiß, e2)", () => {
  const e2 = { zeile: 6, spalte: 4 }
 
  it("darf aus der Grundstellung einen Schritt vor", () => {
    expect(bauerMove(e2, { zeile: 5, spalte: 4 })).toBe(true)
  })
 
  it("darf aus der Grundstellung zwei Schritte vor", () => {
    expect(bauerMove(e2, { zeile: 4, spalte: 4 })).toBe(true)
  })
 
  it("darf nicht über eine Figur springen", () => {
    setze(5, 4, { typ: "S", farbe: "schwarz" })
    expect(bauerMove(e2, { zeile: 4, spalte: 4 })).toBe(false)
  })
 
  it("darf diagonal eine gegnerische Figur schlagen", () => {
    setze(5, 5, { typ: "B", farbe: "schwarz" })
    expect(bauerMove(e2, { zeile: 5, spalte: 5 })).toBe(true)
  })
 
  it("darf nicht weiter als eine Spalte entfernt schlagen", () => {
    setze(5, 7, { typ: "B", farbe: "schwarz" })
    expect(bauerMove(e2, { zeile: 5, spalte: 7 })).toBe(false)
  })
 
  it("darf nicht geradeaus schlagen", () => {
    setze(5, 4, { typ: "B", farbe: "schwarz" })
    expect(bauerMove(e2, { zeile: 5, spalte: 4 })).toBe(false)
  })
})
 
describe("Springer (weiß, b1)", () => {
  const b1 = { zeile: 7, spalte: 1 }
 
  it.each([
    [{ zeile: 5, spalte: 2 }, true],    
    [{ zeile: 5, spalte: 0 }, true],    
    [{ zeile: 5, spalte: 1 }, false],   
    [{ zeile: 6, spalte: 2 }, false],   
  ])("Zug nach %o ist erlaubt: %s", (nach, erwartet) => {
    expect(springerMove(b1, nach)).toBe(erwartet)
  })
})
 
describe("Turm (weiß, a1)", () => {
  it("wird durch den eigenen Bauern auf a2 blockiert", () => {
    expect(turmMove({ zeile: 7, spalte: 0 }, { zeile: 5, spalte: 0 })).toBe(false)
  })
 
  it("darf gerade ziehen, wenn der Weg frei ist", () => {
    setze(6, 0, null)                    // Bauer a2 entfernen
    expect(turmMove({ zeile: 7, spalte: 0 }, { zeile: 4, spalte: 0 })).toBe(true)
  })
})
 