import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { RootState } from '../../../redux/store.ts';

import Button from '../../../components/Button/Button.tsx';
import Input from '../../../components/Input/Input.tsx';
import { setMessage, signIn } from '../../../redux/signInUpSlice.ts';

interface SignInProps {
  styles?: { [key: string]: string };
}

function SignIn({ styles }: SignInProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch: ThunkDispatch<RootState, undefined, Action> = useDispatch();
  const navigate = useNavigate();
  const message = useSelector((state: RootState) => state.signInUpSlice.message);

  const handleLogin = async () => {
    if (email.trim().length <= 0 || password.trim().length <= 0) {
      dispatch(setMessage('Error credentials! Wrong email or password'));
    } else {
      const answer = await dispatch(signIn({ email, password }));
      if (answer.meta.requestStatus === 'fulfilled') {
        navigate('/');
      }
    }
  };

  useEffect(() => {
    document.title = 'Login';
  }, []);

  return (
    <div className={styles?.['container']}>
      <h1 className={styles?.['title']}>Login</h1>

      {message && <div className={styles?.['error']}>{message}</div>}

      <form
        className={styles?.['form']}
        onSubmit={(event) => {
          event.preventDefault();
          handleLogin();
        }}>
        <div className={styles?.['field-container']}>
          <label className={styles?.['label']}>E-Mail Address</label>
          <Input
            className={styles?.['input-sign']}
            type="email"
            value={email}
            placeholder="Enter your email"
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </div>
        <div className={styles?.['field-container']}>
          <label className={styles?.['label']}>Password</label>
          <Input
            className={styles?.['input-sign']}
            type="password"
            value={password}
            placeholder="Enter your password"
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </div>
        <Button className={styles?.['sign']} type="submit">
          Sign in
        </Button>
        <div className={styles?.['notification']}>
          Don&#39;t have an account yet?{' '}
          <Link to="/signup" className={styles?.['link']}>
            Sign Up
          </Link>
        </div>
      </form>
    </div>
  );
}

export default SignIn;
