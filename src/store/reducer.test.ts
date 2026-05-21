import { reducer } from './reducer';
import {
  changeCity,
  changeSortType,
  fillOffers,
  requireAuthorization,
  setOffersDataLoadingStatus,
  setCurrentOffer,
  setNearbyOffers,
  setReviews,
  setOfferNotFoundStatus,
} from './action';
import { AuthorizationStatus } from '../const';
import { Offer } from '../types/offer';
import { Review } from '../types/review';

const mockOffer: Offer = {
  id: '1',
  title: 'Beautiful apartment',
  type: 'apartment',
  price: 120,
  city: {
    name: 'Paris',
    location: {
      latitude: 48.85661,
      longitude: 2.351499,
      zoom: 13,
    },
  },
  location: {
    latitude: 48.85661,
    longitude: 2.351499,
    zoom: 13,
  },
  isPremium: false,
  isFavorite: false,
  rating: 4,
  previewImage: 'img/apartment.jpg',
};

const mockReview: Review = {
  id: '1',
  date: '2024-01-01',
  user: {
    name: 'User',
    avatarUrl: 'img/avatar.jpg',
    isPro: false,
  },
  comment: 'Good place',
  rating: 4,
};

describe('Reducer', () => {
  it('should return initial state with empty action', () => {
    const result = reducer(undefined, { type: 'UNKNOWN_ACTION' });

    expect(result.city).toBe('Paris');
    expect(result.offers).toEqual([]);
    expect(result.favoriteOffers).toEqual([]);
    expect(result.sortType).toBe('Popular');
    expect(result.authorizationStatus).toBe(AuthorizationStatus.Unknown);
    expect(result.isOffersDataLoading).toBe(false);
    expect(result.currentOffer).toBe(null);
    expect(result.nearbyOffers).toEqual([]);
    expect(result.reviews).toEqual([]);
    expect(result.isOfferNotFound).toBe(false);
  });

  it('should change city and reset sort type', () => {
    const result = reducer(undefined, changeCity('Amsterdam'));

    expect(result.city).toBe('Amsterdam');
    expect(result.sortType).toBe('Popular');
  });

  it('should fill offers', () => {
    const result = reducer(undefined, fillOffers([mockOffer]));

    expect(result.offers).toEqual([mockOffer]);
  });

  it('should change sort type', () => {
    const result = reducer(undefined, changeSortType('Price: low to high'));

    expect(result.sortType).toBe('Price: low to high');
  });

  it('should require authorization', () => {
    const result = reducer(undefined, requireAuthorization(AuthorizationStatus.Auth));

    expect(result.authorizationStatus).toBe(AuthorizationStatus.Auth);
  });

  it('should set offers loading status', () => {
    const result = reducer(undefined, setOffersDataLoadingStatus(true));

    expect(result.isOffersDataLoading).toBe(true);
  });

  it('should set current offer', () => {
    const result = reducer(undefined, setCurrentOffer(mockOffer));

    expect(result.currentOffer).toEqual(mockOffer);
  });

  it('should set nearby offers', () => {
    const result = reducer(undefined, setNearbyOffers([mockOffer]));

    expect(result.nearbyOffers).toEqual([mockOffer]);
  });

  it('should set reviews', () => {
    const result = reducer(undefined, setReviews([mockReview]));

    expect(result.reviews).toEqual([mockReview]);
  });

  it('should set offer not found status', () => {
    const result = reducer(undefined, setOfferNotFoundStatus(true));

    expect(result.isOfferNotFound).toBe(true);
  });
});
