import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';

import { Offer } from '../types/offer';
import { AuthData } from '../types/auth-data';
import { AuthInfo } from '../types/auth-info';
import { Review } from '../types/review';
import { AuthorizationStatus } from '../const';
import {
  fillOffers,
  requireAuthorization,
  setOffersDataLoadingStatus,
  setCurrentOffer,
  setNearbyOffers,
  setReviews,
  setOfferNotFoundStatus
} from './action';
import { saveToken, dropToken } from '../services/token';
import { AppDispatch, State } from './index';
import { ReviewData } from '../types/review-data';

export const fetchOffersAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  'data/fetchOffers',
  async (_arg, { dispatch, extra: api }) => {
    dispatch(setOffersDataLoadingStatus(true));

    const { data } = await api.get<Offer[]>('/offers');

    dispatch(fillOffers(data));
    dispatch(setOffersDataLoadingStatus(false));
  }
);

export const fetchOfferAction = createAsyncThunk<
  void,
  string,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  'data/fetchOffer',
  async (id, { dispatch, extra: api }) => {
    dispatch(setOfferNotFoundStatus(false));
    dispatch(setCurrentOffer(null));

    try {
      const [{ data: offer }, { data: nearbyOffers }, { data: reviews }] =
        await Promise.all([
          api.get<Offer>(`/offers/${id}`),
          api.get<Offer[]>(`/offers/${id}/nearby`),
          api.get<Review[]>(`/comments/${id}`),
        ]);

      dispatch(setCurrentOffer(offer));
      dispatch(setNearbyOffers(nearbyOffers));
      dispatch(setReviews(reviews));
    } catch {
      dispatch(setOfferNotFoundStatus(true));
    }
  }
);

export const checkAuthAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  'user/checkAuth',
  async (_arg, { dispatch, extra: api }) => {
    try {
      await api.get('/login');
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
    } catch {
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  }
);

export const loginAction = createAsyncThunk<
  void,
  AuthData,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  'user/login',
  async ({ email, password }, { dispatch, extra: api }) => {
    const { data } = await api.post<AuthInfo>('/login', { email, password });

    saveToken(data.token);
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
  }
);

export const logoutAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  'user/logout',
  async (_arg, { dispatch, extra: api }) => {
    await api.delete('/logout');

    dropToken();
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
  }
);
export const postReviewAction = createAsyncThunk<
  void,
  ReviewData,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  'data/postReview',
  async ({ offerId, comment, rating }, { dispatch, extra: api }) => {
    await api.post(`/comments/${offerId}`, { comment, rating });

    const { data } = await api.get<Review[]>(`/comments/${offerId}`);

    dispatch(setReviews(data));
  }
);
export const changeFavoriteStatusAction = createAsyncThunk<
  Offer,
  {
    offerId: string;
    status: number;
  },
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  'data/changeFavoriteStatus',
  async ({ offerId, status }, { extra: api }) => {
    const { data } = await api.post<Offer>(
      `/favorite/${offerId}/${status}`
    );

    return data;
  }
);
export const fetchFavoriteOffersAction = createAsyncThunk<
  Offer[],
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  'data/fetchFavoriteOffers',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<Offer[]>('/favorite');

    return data;
  }
);
