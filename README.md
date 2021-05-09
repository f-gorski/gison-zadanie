# gison-zadanie

## Technologie
* HTML5
* CSS/Sass
* Javascript
* Leaflet
* jQuery
* Nominatim API
* NPM + Webpack

## Instalacja
Instalacja wymaga zainstalowanego NPM (managera paczek node). Po sklonowaniu projektu wszystkie paczki i dependencje mogą być pobrane przy użyciu komendy:

### `npm install`

## Uzywana wersja Node.js i npm

### `node: v12.14.0` 
### `npm: 6.13.4`

## Dostępne komendy

W katalogu projektu można uruchomić:

### `npm start`

Uruchamia aplikację w trybie deweloperskim na serwerze lokalnym.<br />
[http://localhost:3001](http://localhost:3001)

### `npm run build`

Buduje aplikację w trybie produkcyjnym w katalogu `build`.<br /> Aplikację można również uruchomic z pliku `index.html` w tym katalogu.

## Struktura plików
```bash
src
    ├───img
    ├───json
    ├───libs
    │   └───images
    ├───map
    │   ├───featureLayers
    │   ├───mapCustomElements
    │   └───tileLayers
    └───styles
        ├───base
        ├───layout
        └───variables
```

Katalogiem zawierającym moduły obsługujące aplikację mapową jest katalog `src/map`. 
Głównym modułem obsługującym wyświetlanie mapy, interakcję z biblioteką Leaflet i obsługę zdarzeń jest plik `src/map/map.js`.
Struktura plików zakłada oddzielenie modelu danych źrodłowych w folderze `src/json` od kontrolerów poszczególnych warstw w katalogu `src/map/featureLayers` od modułu integrującego wyświetlanie mapy `src/map/map.js`.

