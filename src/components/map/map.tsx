import { useEffect, useRef } from 'react';
import leaflet from 'leaflet';

import { Offer, Location } from '../../types/offer';

type MapProps = {
  city: Location;
  offers: Offer[];
  selectedOfferId?: string | null;
  className: string;
};

const defaultIcon = leaflet.icon({
  iconUrl: 'img/pin.svg',
  iconSize: [27, 39],
  iconAnchor: [13, 39],
});

const activeIcon = leaflet.icon({
  iconUrl: 'img/pin-active.svg',
  iconSize: [27, 39],
  iconAnchor: [13, 39],
});

function Map({ city, offers, selectedOfferId, className }: MapProps): JSX.Element {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<leaflet.Map | null>(null);
  const markerLayerRef = useRef<leaflet.LayerGroup | null>(null);

  useEffect(() => {
    if (mapRef.current !== null && mapInstanceRef.current === null) {
      mapInstanceRef.current = leaflet.map(mapRef.current).setView(
        [city.latitude, city.longitude],
        city.zoom
      );

      leaflet
        .tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        })
        .addTo(mapInstanceRef.current);

      markerLayerRef.current = leaflet
        .layerGroup()
        .addTo(mapInstanceRef.current);
    }
  }, [city]);

  useEffect(() => {
    if (mapInstanceRef.current !== null && markerLayerRef.current !== null) {
      mapInstanceRef.current.setView(
        [city.latitude, city.longitude],
        city.zoom
      );

      markerLayerRef.current.clearLayers();

      offers.forEach((offer) => {
        const currentIcon =
          String(offer.id) === String(selectedOfferId)
            ? activeIcon
            : defaultIcon;

        leaflet
          .marker([offer.location.latitude, offer.location.longitude], {
            icon: currentIcon,
          })
          .addTo(markerLayerRef.current as leaflet.LayerGroup);
      });
    }
  }, [city, offers, selectedOfferId]);

  return <div className={`${className} map`} ref={mapRef}></div>;
}

export default Map;
