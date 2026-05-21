import { memo } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { Offer } from '../../types/offer';
import { AuthorizationStatus } from '../../const';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, State } from '../../store';
import { changeFavoriteStatusAction } from '../../store/api-actions';

type OfferCardProps = {
  offer: Offer;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
};

function OfferCard({
  offer,
  onMouseEnter,
  onMouseLeave,
}: OfferCardProps): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const authorizationStatus = useSelector(
    (state: State) => state.authorizationStatus
  );

  const handleFavoriteClick = () => {
    if (authorizationStatus !== AuthorizationStatus.Auth) {
      navigate('/login');
      return;
    }

    dispatch(changeFavoriteStatusAction({
      offerId: offer.id,
      status: Number(!offer.isFavorite),
    }));
  };
  return (
    <article
      className="cities__card place-card"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {offer.isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}

      <div className="cities__image-wrapper place-card__image-wrapper">
        <Link to={`/offer/${offer.id}`}>
          <img
            className="place-card__image"
            src={offer.previewImage}
            width="260"
            height="200"
            alt={offer.title}
          />
        </Link>
      </div>

      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">€{offer.price}</b>
            <span className="place-card__price-text"> / night</span>
          </div>

          <button
            className={`place-card__bookmark-button button ${
              offer.isFavorite ? 'place-card__bookmark-button--active' : ''
            }`}
            type="button" onClick={handleFavoriteClick}
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark" />
            </svg>
            <span className="visually-hidden">
              {offer.isFavorite ? 'In bookmarks' : 'To bookmarks'}
            </span>
          </button>
        </div>

        <h2 className="place-card__name">
          <Link to={`/offer/${offer.id}`}>{offer.title}</Link>
        </h2>

        <p className="place-card__type">{offer.type}</p>
      </div>
    </article>
  );
}

const MemoizedOfferCard = memo(OfferCard);

export default MemoizedOfferCard;
