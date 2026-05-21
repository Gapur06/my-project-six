import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';

import PrivateRoute from './private-route';
import { reducer } from '../../store/reducer';
import { AuthorizationStatus } from '../../const';

describe('Component: PrivateRoute', () => {
  it('should render children when user is authorized', () => {
    const store = configureStore({
      reducer,
      preloadedState: {
        city: 'Paris',
        offers: [],
        favoriteOffers: [],
        sortType: 'Popular',
        authorizationStatus: AuthorizationStatus.Auth,
        isOffersDataLoading: false,
        currentOffer: null,
        nearbyOffers: [],
        reviews: [],
        isOfferNotFound: false,
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <PrivateRoute>
            <h1>Private page</h1>
          </PrivateRoute>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Private page')).toBeInTheDocument();
  });

  it('should redirect unauthorized user to login page', () => {
    const store = configureStore({
      reducer,
      preloadedState: {
        city: 'Paris',
        offers: [],
        favoriteOffers: [],
        sortType: 'Popular',
        authorizationStatus: AuthorizationStatus.NoAuth,
        isOffersDataLoading: false,
        currentOffer: null,
        nearbyOffers: [],
        reviews: [],
        isOfferNotFound: false,
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/favorites']}>
          <PrivateRoute>
            <h1>Private page</h1>
          </PrivateRoute>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.queryByText('Private page')).not.toBeInTheDocument();
  });
});
