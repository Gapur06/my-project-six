import { Offer } from '../../types/offer';
import OfferList from '../../components/offer-list/offer-list';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { fetchFavoriteOffersAction } from '../../store/api-actions';
type FavoritesPageProps = {
  offers: Offer[];
};

function FavoritesPage({ offers }: FavoritesPageProps): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchFavoriteOffersAction());
  }, [dispatch]);
  if (offers.length === 0) {
    return (
      <main className="page__main page__main--favorites page__main--favorites-empty">
        <div className="page__favorites-container container">
          <section className="favorites favorites--empty">
            <h1 className="visually-hidden">Favorites</h1>
            <div className="favorites__status-wrapper">
              <b className="favorites__status">Nothing yet saved.</b>
              <p className="favorites__status-description">
                Save properties to narrow down search or plan your future trips.
              </p>
            </div>
          </section>
        </div>
      </main>
    );
  }

  return (
    <main className="page__main page__main--favorites">
      <div className="page__favorites-container container">
        <section className="favorites">
          <h1 className="favorites__title">Saved listing</h1>

          <OfferList offers={offers} />
        </section>
      </div>
    </main>
  );
}

export default FavoritesPage;
