import { useParams } from 'react-router-dom';

import { Offer } from '../../types/offer';
import ReviewForm from '../../components/review-form/review-form';
type OfferPageProps = {
  offers: Offer[];
};

function OfferPage({ offers }: OfferPageProps): JSX.Element {
  const { id } = useParams();

  const currentOffer = offers.find((offer) => offer.id === id);

  if (!currentOffer) {
    return <h1>Offer not found</h1>;
  }

  return (
    <main>
      <h1>{currentOffer.title}</h1>
      <p>Price: €{currentOffer.price}</p>
      <p>Type: {currentOffer.type}</p>
      <ReviewForm />
    </main>
  );
}

export default OfferPage;
