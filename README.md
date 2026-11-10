# Schachspiel im Browser

Ein Schachspiel im Browser, geschrieben in TypeScript. Zwei Spieler spielen gegeneinander per Mausklick am selben Gerät.  
  
Das Projekt setzt die Zugregeln für jede Figur um und erkennt Schach, Schachmatt und Patt. Einige Sonderregeln fehlen noch (siehe Bekannte Einschränkungen).  

![Schach Spiel](assets/Screenshot%202026-11-03%20100312.png)  

## Funktionen:

- Brett mit Startaufstellung, das über den Button „Start Game!" gestartet oder mit "Neues Spiel!" neugestartet wird  
- Figur per Klick auswählen (grüne Markierung), Zielfeld per Klick wählen; erneuter Klick auf dieselbe Figur hebt die Auswahl auf  
- Zugregeln für Bauer, Turm, Läufer, Springer, Dame und König, inklusive Blockierung durch andere Figuren und Schlagen  
- Abwechselnder Zug von Weiß und Schwarz  
- Erkennung von Schach, Schachmatt und Patt: Züge, die den eigenen König im Schach lassen, sind nicht erlaubt  
- Bauernumwandlung mit Auswahl der neuen Figur (Dame, Turm, Läufer oder Springer)
- (NEU) kurzes sowie langes rochieren zwischen dem Turm und dem König
- (NEU) Visualisierung bewegbarer Felder

![Schach Spiel](assets/Screenshot%202026-11-03%20101929.png)
![Schach Spiel](assets/Screenshot%202026-11-10%20160905.png)

## Technologien:

TypeScript, HTML, CSS, Git, Vitest  

## Aufbau:

  mein-projekt/  
├── .gitignore  
├── README.md  
├── package.json  
├── package-lock.json  
├── tsconfig.json  
├── assets/: Screenshots  
├── src/  
│&nbsp;&nbsp;&nbsp;├── types.ts:    Typen  
│&nbsp;&nbsp;&nbsp;├── board.ts:    Spielbrett, Startaufstellung, Zeichnen des Bretts, Ausführen eines Zuges, Bauerumwandlung,  
│&nbsp;&nbsp;&nbsp;├── pruefen.ts:  Erkennung von Schach, Schachmatt und Patt  
│&nbsp;&nbsp;&nbsp;├── regel.ts:    Zugregeln pro Figur  
│&nbsp;&nbsp;&nbsp;├── move.ts:     Klickverarbeitung, Auswahl, Spieler am Zug  
│&nbsp;&nbsp;&nbsp;├── index.ts:    Startpunkt, verbindet die Teile  
│&nbsp;&nbsp;&nbsp;├── index.html:  Webseite  
│&nbsp;&nbsp;&nbsp;├── style.css:   Darstellung  
│&nbsp;&nbsp;&nbsp;└── regel.test.ts: Tests  
│       
└── public/  
&nbsp;&nbsp;&nbsp;└──index.html  


  

Das Spielbrett steht als Daten (Array aus Zeilen und Feldern) im Speicher.   
Ein Zug verändert zuerst diese Daten, danach wird das Brett neu gezeichnet.  

## Starten des Spieles:

Voraussetzungen: [Git](https://git-scm.com), [Node.js](https://nodejs.org) (enthält npm) und Visual Studio Code mit der Erweiterung „Live Server".  

1. Repository herunterladen: `git clone https://github.com/EmilisKrup/Schach.git`  
2. In den Projektordner wechseln: `cd [IHR PROJEKTORDNER]`  
3. index.html mit einem lokalen Server öffnen, z.B die Extension Live-Server im VS-Code  
3. Abhängigkeiten installieren: `npm install`  
4. TypeScript kompilieren (die Ausgabe landet im Ordner `dist/`): `tsc`  
5. Den gesamten Projektordner in VS Code öffnen: `code .`  
6. Im Editor mit der rechten Maustaste auf `src/index.html` klicken und „Open with Live Server" wählen   

- `<PROJEKTORDNER>` ersetzen Sie durch den Namen des Ordners, der dabei entsteht.  
- Öffnen Sie den ganzen Projektordner und nicht nur `src`, weil die Seite die Datei `../dist/index.js` lädt.  
- Ein Doppelklick auf die `index.html` funktioniert nicht, weil Browser ES-Module nicht direkt aus einer Datei laden. Es braucht einen lokalen Server.  
- Nach jeder Änderung am Code muss erneut `npx tsc` ausgeführt werden.  

## Tests ausführen  
 
Die Tests liegen als `regel.test.ts` in `src/` und laufen mit [Vitest](https://vitest.dev). Sie prüfen die Zugregeln der Figuren.  Das Brett wird dabei in einer simulierten Browserumgebung (jsdom) aufgebaut, daher braucht es keinen geöffneten Browser.  
 
1. Abhängigkeiten installieren (falls noch nicht geschehen): `npm install`  
2. Alle Tests starten: `npm test`. Vitest läuft weiter und führt die Tests nach jeder Änderung erneut aus. Beenden mit `q`.  
3. Alle Tests nur einmal ausführen: `npx vitest run`  

Ein bestandener Test erscheint mit einem grünen Häkchen. Bei einem fehlgeschlagenen Test zeigt Vitest den erwarteten und den tatsächlichen Wert.  

## Bekannte Einschränkungen:
 
- Das Spielende (Schachmatt oder Patt) wird nur in der Browser-Konsole gemeldet, nicht auf der Seite. Danach sind keine Züge mehr möglich.  
- Rochade und en passant fehlen.  
- Mögliche Zielfelder werden nicht hervorgehoben.  

## Geplante Erweiterungen:

**Kurzfristig**

- Rochade (FERTIG) 
- Kleinere Verbesserungen an der Bedienung (z. B. Hervorheben möglicher Zielfelder, Meldung des Spielendes auf der Seite)  (FERTIG)

**Langfristig**
 
- en passant
- Umstellung auf Objektklassen (z. B. `new Bauer(...)`) statt Figuren als einfache Daten. Ein erster Entwurf steht als auskommentierter Code in `types.ts` und `board.ts` und ist als Vorbereitung gedacht.
- Überarbeitung der Oberfläche
- Backend, z. B. für Online-Partien

# Hinweis zur Entstehung

Teile der Datenstruktur und Darstellung des Bretts entstanden mit Unterstützung eines KI-Assistenten.  
Die Zugregeln, die Spiellogik, die Auswahl und die Zugreihenfolge habe ich selbst implementiert.  
