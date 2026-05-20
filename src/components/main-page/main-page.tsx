import OfferList from '../offer-list/offer-list';
import Map from '../map/map';
import { useSelector } from 'react-redux';
import { State } from '../../store';
import CitiesList from '../cities-list/cities-list';
import SortOptions from '../sort-options/sort-options';
import { useState } from 'react';

function MainPage(): JSX.Element {
  const city = useSelector((state: State) => state.city);
  const offers = useSelector((state: State) => state.offers);
  const [activeOfferId, setActiveOfferId] = useState<string | null>(null);


  const cityOffers = offers.filter((offer) => offer.city === city);
  const sortType = useSelector((state: State) => state.sortType);

  const sortedOffers = [...cityOffers].sort((a, b) => {
    switch (sortType) {
      case 'Price: low to high':
        return a.price - b.price;

      case 'Price: high to low':
        return b.price - a.price;

      case 'Top rated first':
        return b.rating - a.rating;

      default:
        return 0;
    }
  });
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
              onCardHover={setActiveOfferId}
            />
          </section>

          <div className="cities__right-section">
            {sortedOffers.length > 0 && (
              <Map
                city={sortedOffers[0].location}
                offers={sortedOffers}
                selectedOfferId={activeOfferId}
                className="cities__map"
              />
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
export default MainPage;
