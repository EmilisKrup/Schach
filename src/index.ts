import { neuesSpiel, zeichneBrett } from "./board.js"
import { auswahlLoeschen, initKlicks} from "./move.js"
 
const container = document.getElementById("brett")
const startButton = document.getElementById("start")
 
if (container && startButton) {
  const neuZeichnen = () => zeichneBrett(container)
 
  initKlicks(container, neuZeichnen)          // nur EINMAL anmelden
 
  startButton.addEventListener("click", () => {
    neuesSpiel()
    auswahlLoeschen()
    neuZeichnen()
    container.classList.add("aktiv")
  })
}
 
