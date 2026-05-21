import { memo } from 'react';
import OfferCard from '../offer-card/offer-card';
import { Offer } from '../../types/offer';

type OfferListProps = {
  offers: Offer[];
  onCardHover?: (offerId: string | null) => void;
};

function OfferList({ offers, onCardHover }: OfferListProps): JSX.Element {
  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
        <OfferCard
          key={offer.id}
          offer={offer}
          onMouseEnter={() => onCardHover?.(offer.id)}
          onMouseLeave={() => onCardHover?.(null)}
        />
      ))}
    </div>
  );
}

const MemoizedOfferList = memo(OfferList);

export default MemoizedOfferList;
