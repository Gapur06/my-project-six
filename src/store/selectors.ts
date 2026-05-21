import { createSelector } from '@reduxjs/toolkit';
import { State } from './index';

export const selectCity = (state: State) => state.city;
export const selectOffers = (state: State) => state.offers;
export const selectSortType = (state: State) => state.sortType;
export const selectIsOffersDataLoading = (state: State) =>
  state.isOffersDataLoading;

export const selectCityOffers = createSelector(
  [selectOffers, selectCity],
  (offers, city) => offers.filter((offer) => offer.city.name === city)
);

export const selectSortedCityOffers = createSelector(
  [selectCityOffers, selectSortType],
  (offers, sortType) => {
    switch (sortType) {
      case 'Price: low to high':
        return [...offers].sort((a, b) => a.price - b.price);

      case 'Price: high to low':
        return [...offers].sort((a, b) => b.price - a.price);

      case 'Top rated first':
        return [...offers].sort((a, b) => b.rating - a.rating);

      default:
        return offers;
    }
  }
);
