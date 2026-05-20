import { Offer } from '../../types/offer';
import OfferList from '../offer-list/offer-list';

type MainPageProps = {
  offersCount: number;
  offers: Offer[];
};

function MainPage({ offersCount, offers }: MainPageProps): JSX.Element {
  return (
    <main>
      <h1>{offersCount} places to stay in Amsterdam</h1>

      <OfferList offers={offers} />
    </main>
  );
}

export default MainPage;
