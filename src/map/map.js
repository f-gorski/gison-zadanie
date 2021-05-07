import L from 'leaflet';
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

L.control.layers(baseLayers, overlayLayers).addTo(map);