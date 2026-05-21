import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';

import Header from './header';
import { reducer } from '../../store/reducer';
import { AuthorizationStatus } from '../../const';

describe('Component: Header', () => {
  it('should render sign in link when user is not authorized', () => {
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
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Sign in')).toBeInTheDocument();
  });

  it('should render user email and favorite count when user is authorized', () => {
    const store = configureStore({
      reducer,
      preloadedState: {
        city: 'Paris',
        offers: [],
        favoriteOffers: [
          {
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
            isFavorite: true,
            rating: 4,
            previewImage: 'img/apartment.jpg',
          },
        ],
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
          <Header />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('user@email.com')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
  });
});
