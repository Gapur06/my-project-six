import { Offer } from '../../types/offer';
import OfferList from '../../components/offer-list/offer-list';

type FavoritesPageProps = {
  offers: Offer[];
};

function FavoritesPage({ offers }: FavoritesPageProps): JSX.Element {
  return (
    <main>
      <h1>Favorites page</h1>

      <OfferList offers={offers} />
    </main>
  );
}

export default FavoritesPage;
