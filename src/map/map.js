import L from 'leaflet';
import $ from 'jquery';

//the following code is to make leaflet work properly with webpack, it is needed to explicitly override and require icons for markers. This is known issue in leaflet.
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png').default,
  iconUrl: require('leaflet/dist/images/marker-icon.png').default,
  shadowUrl: require('leaflet/dist/images/marker-shadow.png').default,
});

import { baseLayer } from './tileLayers/baseLayer';

import sights from '../json/sights.json';
import tracks from '../json/tracks.json';

export const map = L.map('map', {
    center: [50.0646501, 19.9449799],
    zoom: 12
});

baseLayer.addTo(map);

//sights markers generation
sights.rows.forEach(sight => {
    if(parseFloat(sight.latitude_0) && parseFloat(sight.longitude_0)) {
        const marker = new L.marker([sight.latitude_0, sight.longitude_0])
            .addTo(map)
            .bindPopup(sight.opis !== "brak" ? sight.opis : "brak opisu");
    }
});

//tracks polylines generation
tracks.posts.forEach(track => {
    if(track.custom_fields.line_data) {
        const polyline = track.custom_fields.line_data[0]
            .split(';')
            .filter(coords => coords.length > 0)
            .map(coords => {
                return coords.split(',').filter(coordsPair => coordsPair && coordsPair.length >= 2)
            });

        const line = new L.polyline(polyline)
            .addTo(map)
            .bindPopup(track.excerpt);
    }             
});
