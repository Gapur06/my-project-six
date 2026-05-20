import { useEffect, useRef } from 'react';
import leaflet from 'leaflet';

import { Offer, Location } from '../../types/offer';

type MapProps = {
  city: Location;
  offers: Offer[];
  className: string;
};

function Map({ city, offers, className }: MapProps): JSX.Element {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<leaflet.Map | null>(null);

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
    }
  }, [city]);

  useEffect(() => {
    if (mapInstanceRef.current !== null) {
      offers.forEach((offer) => {
        leaflet
          .marker([offer.location.latitude, offer.location.longitude])
          .addTo(mapInstanceRef.current as leaflet.Map);
      });
    }
  }, [offers]);

  return <div className={`${className} map`} ref={mapRef}></div>;
}

export default Map;
