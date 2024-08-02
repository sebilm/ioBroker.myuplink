# ioBroker.myuplink

Dieser ioBroker-Adapter empfängt Daten von myUplink.com. Einstellungen, die von myUplink dafür freigeschalten wurden, können geändert werden.

## Verwendung dieses Adapters

1. Es wird eine myUplink-kompatible Wärmepumpe von NIBE, AIT, Cetetherm, ClimateMaster, Contura, CTA, CTC, Enertech Global or Høiax benötigt.
2. Es wird ein Account bei myUplink benötigt: https://myuplink.com
3. Auf der myUplink-API-Webseite einloggen: https://dev.myuplink.com
4. "Applications" und dann "Create New Application" anklicken
5. Name und Description können beliebig ausgefüllt werden, z.B. "ioBroker"
6. Die Callback URL ist für den Authorization Code Grant Flow wichtig. Es kann https://sebilm.github.io/ioBroker.myuplink/myuplink.html eingetragen werden.
7. Die myUplink API Services Agreements müssen akzeptiert und es muss auf "Create" geklickt werden.
8. Es wird ein Identifier und ein Secret angezeigt - diese werden benötigt.
9. Nun diesen Adapter in ioBroker installieren.
10. Auf der Einstellungsseite des Adapters den Identifier und das Secret eingeben.
11. Die Sprache und alle anderen Einstellungen auswählen und einstellen.
12. Speichern und Schliessen klicken.

Jedes Gerät verfügt über ein Objekt im Objektbaum namens "setData". Dort kann ein JSON-Objekt der Form

```json
{
    "12345": "42",
    "23456": "1"
}
```

in das Objekt eingetragen werden. Dies ermöglicht es, mehrere Datenpunkte gleichzeitig an die API zu senden und zu ändern.
Es kann auch verwendet werden, um Datenpunkte zu ändern, die nicht von der API gesendet werden.

## Arbeitsweise des Adapters

Der Adapter holt von der myuplink-API aller x Minuten (je nach Einstellung) die Liste der Systeme und Geräte. Anschließend
holt er für jedes Gerät die vorhandenen Parameter und speichert sie im Objektbaum. Wenn myUplink dabei neue Parameter sendet,
dann werden diese automatisch dem Objektbaum hinzugefügt.

Der Adapter löscht generell keine Objekt, damit es nicht zu Datenverlust kommt, falls myUplink mal einen Parameter nicht mit sendet.

Der Adapter hat auch keinen Einfluss darauf, welche Parameter von myUplink gesendet werden.
