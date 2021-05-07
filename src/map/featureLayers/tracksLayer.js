import tracks from '../../json/tracks.json';

const tracksFeatures = [];

tracks.posts.forEach(track => {
    if(track.custom_fields.line_data) {
        const polyline = track.custom_fields.line_data[0]
            .split(';')
            .filter(coords => coords.length > 0)
            .map(coords => {
                return coords.split(',').filter(coordsPair => coordsPair && coordsPair.length >= 2);
            });

        const line = new L.polyline(polyline).bindPopup(track.excerpt);
        tracksFeatures.push(line);
    }             
});

export const tracksLayer = L.layerGroup(tracksFeatures);