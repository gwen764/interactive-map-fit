# Interaktivní mapa průchodu studiem na FIT ČVUT
## Prototyp web front-end aplikace vizualizací

Tento dokument obsahuje návod pro spuštění implementace prototypu a její dokumentace.

> Doporučeno otevřít ve webovém prohlížeči **Google Chrome**.


Pro spuštění a instalaci závislostí je použit správce balíčku pro JavaScript `npm`.

### Spuštění aplikace

1. Instalace potřebných závislostí:

`npm install`

2. Spuštení React aplikace na lokálním serveru:

`npm start`

Po spuštění je aplikace přístupná v develop módu na lokálním serveru [http://localhost:3000](http://localhost:3000).


> Mockovaná data jsou zajištěna pomocí **Mock Service Workeru**, který je spuštěn pouze v develop módu.

### Dokumentace

Návody pro spuštění (nebo vygenrování) dokumentací

#### Storybook

Spuštění Storybook dokumentace na lokálním serveru:

`npm run storybook`

Po spuštění je interaktivní dokumentace Storybook přístupná na lokálním serveru [http://localhost:6006](http://localhost:6006).


> Interaktivní ukázka je dostupná pod záložkou **VISUALISATION** v levém panelu stránky. Každá vizualizace obsahuje jednu dokumentaci v souboru `Documentation` a následně několik příběhů (stories). 

#### JSDoc

Pro vygenerování statických stránek s dokumentací je potřeba **JSDoc**, následně stačí příkaz:

`npm run docs`

Vygenerovaná HTML dokumentace se nachází ve složce `docs` a lze zobrazit ve webovém prohlížeči otevřením `docs/index.html`stránky.


