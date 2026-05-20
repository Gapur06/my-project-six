import OfferCard from '../offer-card/offer-card';

type MainPageProps = {
  offersCount: number;
};

function MainPage({offersCount}: MainPageProps): JSX.Element {
  return (
    <main className="page__main page__main--index">
      <h1 className="visually-hidden">Cities</h1>

      <div className="tabs">
        <section className="locations container">
          <ul className="locations__list tabs__list">
            <li className="locations__item">
              <a className="locations__item-link tabs__item tabs__item--active" href="#">
                <span>Amsterdam</span>
              </a>
            </li>
          </ul>
        </section>
      </div>

      <div className="cities">
        <div className="cities__places-container container">
          <section className="cities__places places">
            <h2 className="visually-hidden">Places</h2>

            <b className="places__found">{offersCount} places to stay in Amsterdam</b>

            <div className="cities__places-list places__list tabs__content">
              {Array.from({length: offersCount}).map(() => (
                <OfferCard key={crypto.randomUUID()} />
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

export default MainPage;
