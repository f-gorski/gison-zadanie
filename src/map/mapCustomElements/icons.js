//the following code is to make leaflet work properly with webpack, it is needed to explicitly override and require icons for markers. This is known issue in leaflet.
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png').default,
  iconUrl: require('leaflet/dist/images/marker-icon.png').default,
  shadowUrl: require('leaflet/dist/images/marker-shadow.png').default,
});

export const availableSightIcon = L.icon({
    iconUrl: require('../../img/marker_icon_dostepne.png').default,
    iconAnchor: [16, 18]
});

export const unavailableSightIcon = L.icon({
    iconUrl: require('../../img/marker_icon_niedostepne.png').default,
    iconAnchor: [16, 18]
});