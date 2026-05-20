import { createReducer } from '@reduxjs/toolkit';
import { changeCity, fillOffers, changeSortType } from './action';
import { Offer } from '../types/offer';
import { offers } from '../mocks/offers';

type InitialState = {
  city: string;
  offers: Offer[];
  sortType: string;
};

const initialState: InitialState = {
  city: 'Amsterdam',
  offers,
  sortType: 'Popular',
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
    });
});
