import { Offer } from '../../types/offer';
import OfferList from '../offer-list/offer-list';
import Map from '../map/map';

type MainPageProps = {
  offersCount: number;
  offers: Offer[];
};

function MainPage({ offersCount, offers }: MainPageProps): JSX.Element {
  const city = {
    latitude: 52.370216,
    longitude: 4.895168,
    zoom: 10,
  };

  return (
    <main>
      <h1>{offersCount} places to stay in Amsterdam</h1>

      <OfferList offers={offers} />

      <Map city={city} offers={offers} className="cities__map" />
    </main>
  );
}

export default MainPage;
