import { FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { AppDispatch } from '../../store';
import { loginAction } from '../../store/api-actions';

function LoginPage(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();


    dispatch(loginAction({
      email,
      password,
    }))
      .unwrap()
      .then(() => {
        navigate('/');
      });
  };

  return (
    <div>
      <h1>Sign in</h1>

      <form action="#" method="post" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          autoComplete="username"
          value={email}
          onChange={(evt) => setEmail(evt.target.value)}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          autoComplete="current-password"
          value={password}
          onChange={(evt) => setPassword(evt.target.value)}
          required
        />

        <button type="submit">
          Sign in
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
