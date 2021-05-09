import $ from 'jquery';

import { baseLayer } from './tileLayers/baseLayer';
import { sightsLayer } from './featureLayers/sightsLayer';
import { tracksLayer } from './featureLayers/tracksLayer';


const DEFAULT_VIEW = {
	lat: 50.0646501,
	lng: 19.9449799,
	zoom: 12
}

//initial view evaluation to use on map load, either from localStorage or if empty from default view constant
const initialView = JSON.parse(window.localStorage.getItem('savedView')) || DEFAULT_VIEW;

export const map = L.map('map', {
    center: [initialView.lat, initialView.lng],
    zoom: initialView.zoom
});

//Saving map view to localStorage after view change
map.on('moveend', () => {
	const savedView = {
		lat: map.getCenter().lat,
		lng: map.getCenter().lng,
		zoom: map.getZoom(),
	}
	
	window.localStorage.setItem('savedView', JSON.stringify(savedView));
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

//Default view button
$('<a class="leaflet-control-default-view" href="#" title="Widok domyślny" role="button" aria-label="Widok domyślny"><i class="fas fa-compress-arrows-alt"></i></a>')
	.appendTo('.leaflet-control-zoom.leaflet-bar.leaflet-control')
	.on('click', () => {
	map.setView([DEFAULT_VIEW.lat, DEFAULT_VIEW.lng], DEFAULT_VIEW.zoom);
});
