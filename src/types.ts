export type Farbe = "weiss" | "schwarz"
export type FigurType = "K" | "D" | "T" | "L" | "S" | "B"
export interface Figur { typ: FigurType; farbe: Farbe }
export type Feld = Figur | null
export type Brett = Feld[][]
export type Position = { zeile: number; spalte: number }
export type Spielzug = Farbe

//Objektklassen siehe README
/*export class Bauer implements Figur{
    constructor(public typ: FigurType, public farbe: Farbe){

    }
}
*/