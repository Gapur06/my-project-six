import { createReducer } from '@reduxjs/toolkit';

import {
  changeCity,
  fillOffers,
  changeSortType,
  requireAuthorization,
  setOffersDataLoadingStatus,
  setCurrentOffer,
  setNearbyOffers,
  setReviews,
  setOfferNotFoundStatus,
} from './action';

import { Offer } from '../types/offer';
import { Review } from '../types/review';
import { AuthorizationStatus } from '../const';
import {
  changeFavoriteStatusAction,
  fetchFavoriteOffersAction,
} from './api-actions';

type InitialState = {
  city: string;
  offers: Offer[];
  favoriteOffers: Offer[];
  sortType: string;
  authorizationStatus: AuthorizationStatus;
  isOffersDataLoading: boolean;

  currentOffer: Offer | null;
  nearbyOffers: Offer[];
  reviews: Review[];

  isOfferNotFound: boolean;
};

const initialState: InitialState = {
  city: 'Paris',
  offers: [],
  favoriteOffers: [],
  sortType: 'Popular',
  authorizationStatus: AuthorizationStatus.Unknown,
  isOffersDataLoading: false,

  currentOffer: null,
  nearbyOffers: [],
  reviews: [],

  isOfferNotFound: false,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
      state.sortType = 'Popular';
    })

    .addCase(fillOffers, (state, action) => {
      state.offers = action.payload;
    })

    .addCase(changeSortType, (state, action) => {
      state.sortType = action.payload;
    })

    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })

    .addCase(setOffersDataLoadingStatus, (state, action) => {
      state.isOffersDataLoading = action.payload;
    })

    .addCase(setCurrentOffer, (state, action) => {
      state.currentOffer = action.payload;
    })

    .addCase(setNearbyOffers, (state, action) => {
      state.nearbyOffers = action.payload;
    })

    .addCase(setReviews, (state, action) => {
      state.reviews = action.payload;
    })

    .addCase(setOfferNotFoundStatus, (state, action) => {
      state.isOfferNotFound = action.payload;
    })

    .addCase(fetchFavoriteOffersAction.fulfilled, (state, action) => {
      state.favoriteOffers = action.payload;
    })

    .addCase(changeFavoriteStatusAction.fulfilled, (state, action) => {
      const updatedOffer = action.payload;

      state.offers = state.offers.map((offer) =>
        offer.id === updatedOffer.id ? updatedOffer : offer
      );

      state.favoriteOffers = updatedOffer.isFavorite
        ? [...state.favoriteOffers, updatedOffer]
        : state.favoriteOffers.filter((offer) => offer.id !== updatedOffer.id);

      if (state.currentOffer?.id === updatedOffer.id) {
        state.currentOffer = updatedOffer;
      }

      state.nearbyOffers = state.nearbyOffers.map((offer) =>
        offer.id === updatedOffer.id ? updatedOffer : offer
      );
    });
});
