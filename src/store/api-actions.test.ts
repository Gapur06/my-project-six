import MockAdapter from 'axios-mock-adapter';

import { createAPI } from '../services/api';
import { fetchOffersAction } from './api-actions';
import { AppDispatch, State } from './index';
import { fillOffers, setOffersDataLoadingStatus } from './action';
import { Offer } from '../types/offer';

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

describe('Async actions', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);

  let dispatch: AppDispatch;
  let getState: () => State;

  beforeEach(() => {
    dispatch = vi.fn() as unknown as AppDispatch;
    getState = vi.fn() as unknown as () => State;
    mockAPI.reset();
  });

  it('should dispatch fillOffers when GET /offers', async () => {
    mockAPI.onGet('/offers').reply(200, [mockOffer]);

    await fetchOffersAction()(dispatch, getState, api);

    expect(dispatch).toHaveBeenCalledWith(setOffersDataLoadingStatus(true));
    expect(dispatch).toHaveBeenCalledWith(fillOffers([mockOffer]));
    expect(dispatch).toHaveBeenCalledWith(setOffersDataLoadingStatus(false));
  });
});
