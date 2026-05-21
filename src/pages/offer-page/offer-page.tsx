import { useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import ReviewForm from '../../components/review-form/review-form';
import ReviewList from '../../components/review-list/review-list';
import Map from '../../components/map/map';
import OfferList from '../../components/offer-list/offer-list';
import { AppDispatch, State } from '../../store';
import { fetchOfferAction } from '../../store/api-actions';
import { AuthorizationStatus } from '../../const';


function OfferPage(): JSX.Element {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();

  const currentOffer = useSelector((state: State) => state.currentOffer);
  const nearbyOffers = useSelector((state: State) => state.nearbyOffers);
  const reviews = useSelector((state: State) => state.reviews);
  const isOfferNotFound = useSelector((state: State) => state.isOfferNotFound);
  const authorizationStatus = useSelector(
    (state: State) => state.authorizationStatus
  );
  useEffect(() => {
    if (id) {
      dispatch(fetchOfferAction(id));
    }
  }, [dispatch, id]);

  if (!id || isOfferNotFound) {
    return <Navigate to="/404" />;
  }

  if (!currentOffer) {
    return <h1>Loading offer...</h1>;
  }

  return (
    <main>
      <h1>{currentOffer.title}</h1>
      <p>Price: €{currentOffer.price}</p>
      <p>Type: {currentOffer.type}</p>

      <ReviewList reviews={reviews} />

      {authorizationStatus === AuthorizationStatus.Auth && <ReviewForm />}
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
