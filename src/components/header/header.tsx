import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { State } from '../../store';
import { AuthorizationStatus } from '../../const';

function Header(): JSX.Element {
  const authorizationStatus = useSelector(
    (state: State) => state.authorizationStatus
  );

  const favoriteOffersCount = useSelector(
    (state: State) => state.favoriteOffers.length
  );

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link className="header__logo-link" to="/">
              <img
                className="header__logo"
                src="img/logo.svg"
                alt="6 cities logo"
                width="81"
                height="41"
              />
            </Link>
          </div>

          <nav className="header__nav">
            <ul className="header__nav-list">
              {authorizationStatus === AuthorizationStatus.Auth ? (
                <li className="header__nav-item user">
                  <Link className="header__nav-link header__nav-link--profile" to="/favorites">
                    <span className="header__user-name user__name">
                      user@email.com
                    </span>
                    <span className="header__favorite-count">
                      {favoriteOffersCount}
                    </span>
                  </Link>
                </li>
              ) : (
                <li className="header__nav-item user">
                  <Link className="header__nav-link header__nav-link--profile" to="/login">
                    <span className="header__login">Sign in</span>
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
