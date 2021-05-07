import sights from '../../json/sights.json';
import { availableSightIcon, unavailableSightIcon } from '../mapCustomElements/icons';

const sightsFeatures = [];

sights.rows.forEach(sight => {
    //check if is NaN or empty/falsy
    if(parseFloat(sight.latitude_0) && parseFloat(sight.longitude_0)) {
        const marker = new L.marker([sight.latitude_0, sight.longitude_0], 
            {icon: sight.dostepnosc === "dostępny" ? availableSightIcon : unavailableSightIcon})
            .bindPopup(sight.opis !== "brak" ? sight.opis : "brak opisu");
        
        sightsFeatures.push(marker);
    }
});

export const sightsLayer = L.layerGroup(sightsFeatures);