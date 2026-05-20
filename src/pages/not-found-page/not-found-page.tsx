import { Link } from 'react-router-dom';

function NotFoundPage(): JSX.Element {
  return (
    <main>
      <h1>404 Not Found</h1>

      <Link to="/">
        На главную
      </Link>
    </main>
  );
}

export default NotFoundPage;
