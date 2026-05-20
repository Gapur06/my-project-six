import { useParams } from 'react-router-dom';

import { Offer } from '../../types/offer';
import ReviewForm from '../../components/review-form/review-form';
import ReviewList from '../../components/review-list/review-list';
import Map from '../../components/map/map';
import OfferList from '../../components/offer-list/offer-list';
import { reviews } from '../../mocks/reviews';

type OfferPageProps = {
  offers: Offer[];
};

function OfferPage({ offers }: OfferPageProps): JSX.Element {
  const { id } = useParams();

  const currentOffer = offers.find((offer) => offer.id === id);

  if (!currentOffer) {
    return <h1>Offer not found</h1>;
  }

  const nearbyOffers = offers.slice(0, 3);

  return (
    <main>
      <h1>{currentOffer.title}</h1>
      <p>Price: €{currentOffer.price}</p>
      <p>Type: {currentOffer.type}</p>

      <ReviewList reviews={reviews} />
      <ReviewForm />

      <Map
        city={currentOffer.location}
        offers={nearbyOffers}
        className="offer__map"
      />

      <section className="near-places places">
        <h2 className="near-places__title">
          Other places in the neighbourhood
        </h2>

        <OfferList offers={nearbyOffers} />
      </section>
    </main>
  );
}

export default OfferPage;
