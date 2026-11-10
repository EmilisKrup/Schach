import { neuesSpiel, zeichneBrett } from "./board.js"
import { auswahlLoeschen, initKlicks} from "./move.js"
 
const container = document.getElementById("brett")
const startButton = document.getElementById("start")
const neuButton = document.getElementById('neuSpiel') as HTMLButtonElement;
 
if (container && startButton) {
  const neuZeichnen = () => zeichneBrett(container)
  
 
  initKlicks(container, neuZeichnen)          
 
  startButton.addEventListener("click", () => {
    neuesSpiel()
    auswahlLoeschen()
    neuZeichnen()
    container.classList.add("aktiv")
    neuButton.style.display = 'block';
    startButton.style.display = 'none'
  })
}
neuButton.addEventListener("click", () => {
  window.location.reload()
})

