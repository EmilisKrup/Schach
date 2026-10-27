export type Farbe = "weiss" | "schwarz"
export type FigurType = "K" | "D" | "T" | "L" | "S" | "B"
export interface Figur { typ: FigurType; farbe: Farbe }
export type Feld = Figur | null
export type Brett = Feld[][]
export type Position = { zeile: number; spalte: number }
