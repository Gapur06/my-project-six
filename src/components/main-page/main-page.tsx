import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';

import OfferList from '../offer-list/offer-list';
import Map from '../map/map';
import CitiesList from '../cities-list/cities-list';
import SortOptions from '../sort-options/sort-options';
import Spinner from '../spinner/spinner';
import MainEmpty from '../main-empty/main-empty';
import {
  selectCity,
  selectIsOffersDataLoading,
  selectSortedCityOffers,
} from '../../store/selectors';

function MainPage(): JSX.Element {
  const city = useSelector(selectCity);
  const sortedOffers = useSelector(selectSortedCityOffers);
  const isOffersDataLoading = useSelector(selectIsOffersDataLoading);

  const [activeOfferId, setActiveOfferId] = useState<string | null>(null);
  const handleCardHover = useCallback((offerId: string | null) => {
    setActiveOfferId(offerId);
  }, []);
  if (isOffersDataLoading) {
    return <Spinner />;
  }

  if (sortedOffers.length === 0) {
    return <MainEmpty city={city} />;
  }

  return (
    <main className="page__main page__main--index">
      <h1 className="visually-hidden">Cities</h1>

      <CitiesList />

      <div className="cities">
        <div className="cities__places-container container">
          <section className="cities__places places">
            <h2 className="visually-hidden">Places</h2>

            <b className="places__found">
              {sortedOffers.length} places to stay in {city}
            </b>

            <SortOptions />

            <OfferList
              offers={sortedOffers}
              onCardHover={handleCardHover}
            />
          </section>

          <div className="cities__right-section">
            <Map
              city={sortedOffers[0].location}
              offers={sortedOffers}
              selectedOfferId={activeOfferId}
              className="cities__map"
            />
          </div>
        </div>
      </div>
    </main>
  );
}

export default MainPage;
