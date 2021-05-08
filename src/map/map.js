import $ from 'jquery';

import { baseLayer } from './tileLayers/baseLayer';
import { sightsLayer } from './featureLayers/sightsLayer';
import { tracksLayer } from './featureLayers/tracksLayer';

export const map = L.map('map', {
    center: [50.0646501, 19.9449799],
    zoom: 12
});

map.addLayer(baseLayer);
map.addLayer(sightsLayer);
map.addLayer(tracksLayer);

//Layer controls
const baseLayers = {
    "OSM": baseLayer
};

const overlayLayers = {
    "Zabytki": sightsLayer,
    "Trasy": tracksLayer,
};

L.control.layers(baseLayers, overlayLayers, {
	collapsed: false,
	position: "bottomleft"
}).addTo(map);

$('<h2 class="layer-control__header">Warstwy podkładowe</h2>').insertBefore('div.leaflet-control-layers-base');
$('<h2 class="layer-control__header">Warstwy</h2>').insertBefore('div.leaflet-control-layers-overlays');
$('<button class="layer-control__button"><i class="fas fa-arrow-right"></i></button>').appendTo('#map');

const sidePanel = $('.leaflet-bottom.leaflet-left');
const zoomControls = $('.leaflet-control-zoom.leaflet-bar.leaflet-control');
const toggleButton = $('.layer-control__button').on('click', () => {
	sidePanel.toggleClass("closed");
	toggleButton.toggleClass("closed");
	zoomControls.toggleClass("closed");
});


//Search control
L.control.search({
	url: 'https://nominatim.openstreetmap.org/search?format=json&q={s}',
	propertyName: 'display_name',
	propertyLoc: ['lat','lon'],
	marker: { animate: false },
	textCancel: "Anuluj",
	textPlaceholder: "Wyszukaj",
	textErr: "Nie znaleziono",
	collapsed: false,
	autoCollapse: true,
	autoType: false,
	minLength: 2
}).addTo(map);