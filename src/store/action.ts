import { createAction } from '@reduxjs/toolkit';

import { Offer } from '../types/offer';
import { Review } from '../types/review';
import { AuthorizationStatus } from '../const';

export const changeCity = createAction<string>('city/changeCity');

export const fillOffers = createAction<Offer[]>('offers/fillOffers');

export const changeSortType = createAction<string>('sort/changeSortType');

export const requireAuthorization = createAction<AuthorizationStatus>(
  'user/requireAuthorization'
);

export const setOffersDataLoadingStatus = createAction<boolean>(
  'data/setOffersDataLoadingStatus'
);

export const setCurrentOffer = createAction<Offer | null>(
  'data/setCurrentOffer'
);

export const setNearbyOffers = createAction<Offer[]>(
  'data/setNearbyOffers'
);

export const setReviews = createAction<Review[]>(
  'data/setReviews'
);

export const setOfferNotFoundStatus = createAction<boolean>(
  'data/setOfferNotFoundStatus'
);
