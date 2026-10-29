# Schachspiel im Browser
TS Projekt
Ein normales Schachspiel im Browser, geschrieben in TypeScript. Zwei Spieler spielen gegenseitig per Mausklick am selben Gerät.
Das Projekt setzt alle Bewegungsregeln für jede Figur um.
Schach, Schachmatt und einige Sonderregeln wurden noch nicht umgesetzt (s. unten).

# Funktionen:
-Brett mit Startaufstellung, das über den Button „Start Game!" gestartet oder neu gestartet wird
-Figur per Klick auswählen (grüne Markierung), Zielfeld per Klick wählen, erneuter Klick auf dieselbe Figur hebt die Auswahl auf
-Zugregeln für Bauer, Turm, Läufer, Springer, Dame und König, inklusive Blockierung durch andere Figuren und Schlagen
-Abwechselnder Zug von Weiß und Schwarz

# Technologien:

TypeScript, HTML, CSS, Git, Vitest

# Aufbau:
  types.ts:  Typen
  boars.ts:  Spielbrett, Startaufstellung, Zeichnen des Bretts, Ausführen eines Zuges
  regel.ts:  Zugregeln pro Figur
  move.ts:   Klickverarbeitung, Auswahl, Spieler am Zug
  index.ts:  Startpunkt, verbindet die Teile
  index.html/
  style.css: Seite und Darstellung

Das Spielbrett steht als Daten (Array aus Zeilen und Feldern) im Speicher. 
Ein Zug verändert zuerst diese Daten, danach wird das Brett neu gezeichnet.

# Starten des Spieles:
1. alle Dateien herunterladen
2. mit tsc alles kompilieren (wird dann automatisch nach /dist kompiliert)
3. index.html mit einem lokalem Server öffnen (z.B die Extension Live-Server im VS-Code)

# Bekannte Einschränkung:
-König kann nicht geschlagen werden
Grund --> für die spätere Implementation des Schachs und Schachmattes
-keine Erkennung von Schach, Schachmatt oder Patt, das Spiel endet also nicht von selbst
-Rochade, en passant und Bauernumwandlung fehlen
-das erneute Klicken auf Start während Schwarz am Zug ist, 
übergibt nicht den Zug zu Weiß
-keine klare Ansicht, wie sich die Figuren bewegen dürfen

# Geplante:
  Kurzfristig:
                 -Status „im Schach" und Schachmatt
                 -Rochade, en passant, Bauernumwandlung
                 -Kleinere Verbesserungen an der Bedienung

  Langfristig
                 -Umstellung auf Objektklassen (z. B. new Bauer(...)) statt Figuren als einfache Daten 
                  -->erster Entwurf steht als auskommentierter Code in types.ts und board.ts und ist als Vorbereitung gedacht
                 -Überarbeitung der Oberfläche
                 -Backend, z. B. für Online-Partien

# Hinweis zur Entstehung

Teile der Datenstruktur und Darstellung des Bretts entstand mit Unterstützung eines KI-Assistenten.
Die Zugregeln, die Spiellogik, die Auswahl und die Zugreihenfolge habe ich selbst implementiert.
