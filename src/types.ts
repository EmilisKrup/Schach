export type Farbe = "weiss" | "schwarz"
export type FigurType = "K" | "D" | "T" | "L" | "S" | "B"
export interface Figur { typ: FigurType; farbe: Farbe }
export type Feld = Figur | null
export type Brett = Feld[][]
export type Position = { zeile: number; spalte: number }
export type Spielzug = Farbe
export type Rochade = {turmWA: boolean, turmWH: boolean, turmSA: boolean, turmSH: boolean}
//Objektklassen siehe README
/*export class Bauer implements Figur{
    constructor(public typ: FigurType, public farbe: Farbe){

    }
}
*/