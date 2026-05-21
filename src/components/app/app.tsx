import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { TypedUseSelectorHook, useSelector } from 'react-redux';

import MainPage from '../main-page/main-page';
import LoginPage from '../../pages/login-page/login-page';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import OfferPage from '../../pages/offer-page/offer-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import PrivateRoute from '../private-route/private-route';
import { State } from '../../store';
import Header from '../header/header';

const useAppSelector: TypedUseSelectorHook<State> = useSelector;
function App(): JSX.Element {
  const favoriteOffers = useAppSelector((state) => state.favoriteOffers); return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />

        <Route path="/login" element={<LoginPage />} />

        <Route
          path="/favorites"
          element={
            <PrivateRoute>
              <FavoritesPage offers={favoriteOffers} />
            </PrivateRoute>
          }
        />

        <Route path="/offer/:id" element={<OfferPage />} />

        <Route path="/404" element={<NotFoundPage />} />

        <Route path="*" element={<NotFoundPage />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
