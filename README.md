# Minecraft Bot für GrieferGames

Dieses Repository enthält ein Skript zur Automatisierung von Aufgaben auf dem GrieferGames Minecraft-Server unter Verwendung der Mineflayer-Bibliothek. Der Bot kann bestimmte CityBuilds betreten, zu deinem Grundstück teleportieren und über Konsolenbefehle gesteuert werden.

## Voraussetzungen

- [Node.js](https://nodejs.org/) (Version 12 oder höher)
- Ein Minecraft-Konto
- Visual Studio Code (oder ein beliebiger Code-Editor mit Terminal-Unterstützung)

## Benötigte Abhängigkeiten

- `mineflayer-pathfinder`
- `mineflayer`
- `prismarine-viewer`

Diese Abhängigkeiten werden bei der Installation automatisch heruntergeladen.

## Einrichtung

1. **Repository klonen:**

    ```bash
    git clone https://github.com/TheGamePRO112/Griefergames-AFK-Bot
    cd Griefergames-AFK-Bot
    ```


2. **Abhängigkeiten installieren:**

    ```bash
    npm install mineflayer
    npm install prismarine-viewer
    ```


3. **Bot konfigurieren:**

    Öffne `bot.js` und fülle die folgenden Benutzerdaten aus:

    ```javascript
    const userData = {
        user: "deine-email@example.com", // Deine E-Mail
        userpw: "dein-passwort",         // Dein Passwort
        usercb: cb15,                    // Gewünschter CityBuild
        usergs: "/p h",                  // Grundstück zum Teleportieren
        port: 3007,                      // Viewer-Port (bei Bedarf ändern)
        userviewer: true,                // Viewer [true = An, false = Aus]
        usercontrol: true,               // Steuerung [true = An, false = Aus]
    };
    ```

    **Hinweis:** Ändere den restlichen Code nicht.

4. **Skript speichern.**

## Bot starten

1. Öffne Visual Studio Code (oder deinen bevorzugten Code-Editor).

2. Öffne ein neues Terminal:

    - In Visual Studio Code: `Terminal > New Terminal`
  
3. Starte den Bot:

    ```bash
    node bot.js
    ```

## Konsolenbefehle

Der Bot kann über Konsolenbefehle gesteuert werden, wenn der Viewer aktiviert ist. Nach dem Start des Bots kannst du die folgenden Befehle verwenden:

- `w`: Vorwärts bewegen
- `a`: Links bewegen
- `s`: Rückwärts bewegen
- `d`: Rechts bewegen
- `j`: Springen
- `q`: Nach links drehen
- `e`: Nach rechts drehen

Um eine Liste der unterstützten Befehle anzuzeigen, gib `!cmd` in die Konsole ein.

## Viewer und Steuerung

- **Viewer**: Um zu sehen, was der Bot macht, aktiviere den Viewer, indem du `userviewer` auf `true` setzt. Greife über die in der Konsole angegebene URL auf den Viewer zu.
  
- **Steuerung**: Aktiviere die Steuerung über Konsolenbefehle, indem du `usercontrol` auf `true` setzt.

**Hinweis:** Der Viewer muss aktiviert sein, um die Konsolensteuerung zu verwenden.

## Fehlerbehebung

- Wenn der Bot gekickt wird, wartet er 15 Minuten und versucht dann erneut beizutreten.
- Stelle sicher, dass deine Netzwerkschnittstelle korrekt konfiguriert ist, um die lokale IP-Adresse für den Viewer zu erhalten.

## Mitwirken

Du kannst dieses Repository gerne forken und eigene Änderungen vornehmen. Pull-Requests sind willkommen!

## Lizenz

Dieses Projekt ist unter der MIT-Lizenz lizenziert – siehe die [LICENSE](LICENSE)-Datei für Details.
