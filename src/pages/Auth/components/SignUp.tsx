import { useEffect, useMemo, useState } from 'react';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { RootState } from '../../../redux/store.ts';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import Button from '../../../components/Button/Button.tsx';
import ErrorMessage from '../../../components/ErrorMessage/ErrorMessage.tsx';
import Input from '../../../components/Input/Input.tsx';
import { signUp } from '../../../redux/signInUpSlice.ts';

interface SignUpProps {
  styles?: { [key: string]: string };
}

function SignUp({ styles }: SignUpProps) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const [repeatPasswordErr, setRepeatPasswordErr] = useState({});
  const [passwordErr, setPasswordErr] = useState({});

  const navigate = useNavigate();
  const dispatch: ThunkDispatch<RootState, undefined, Action> = useDispatch();
  const message = useSelector((state: RootState) => state.signInUpSlice.message);

  const errorRepeatPassword = useMemo(() => Object.keys(repeatPasswordErr)[0], [repeatPasswordErr]);
  const errorPassword = useMemo(() => Object.keys(passwordErr)[0], [passwordErr]);

  const isValid = () => {
    const passwordErr: {
      invalidPassword: string | null;
    } = {};
    const repeatPasswordErr: {
      passwordIsNotEqual: string | null;
    } = {};
    const regExp = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
    let isValid = true;

    if (!regExp.test(password)) {
      passwordErr.invalidPassword =
        'Password must contain at least 8 characters, one letter, one digit and one special character [!@#$%^&*]';
      isValid = false;
    }

    if (repeatPassword !== password) {
      repeatPasswordErr.passwordIsNotEqual = 'Password is not equal';
      isValid = false;
    }

    setPasswordErr(passwordErr);
    setRepeatPasswordErr(repeatPasswordErr);
    return isValid;
  };

  const handleSignUp = async () => {
    if (isValid()) {
      const answer = await dispatch(signUp({ username, email, password, repeatPassword }));
      if (answer.meta.requestStatus === 'fulfilled') {
        navigate('/login');
      }
    }
  };

  useEffect(() => {
    document.title = 'Sign up';
  }, []);

  return (
    <div className={styles?.['container']}>
      <h1 className={styles?.['title']}>Sign up</h1>

      {message && <div className={styles?.['error']}>{message}</div>}

      <form
        className={styles?.['form']}
        onSubmit={(event) => {
          event.preventDefault();
          handleSignUp();
        }}>
        <div className={styles?.['field-container']}>
          <label className={styles?.['label']}>Username*</label>
          <Input
            className={styles?.['input-sign']}
            type="text"
            value={username}
            placeholder="Enter your username"
            onChange={(event) => setUsername(event.target.value)}
            required
          />
        </div>
        <div className={styles?.['field-container']}>
          <label className={styles?.['label']}>E-Mail Address*</label>
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
          <label className={styles?.['label']}>Password*</label>
          <Input
            className={styles?.['input-sign']}
            type="password"
            value={password}
            isError={errorPassword}
            placeholder="Create a password"
            onChange={(event) => setPassword(event.target.value)}
            required
          />
          {errorPassword && <ErrorMessage method={passwordErr} errorText={errorPassword} />}
        </div>
        <div className={styles?.['field-container']}>
          <label className={styles?.['label']}>Repeat password*</label>
          <Input
            className={styles?.['input-sign']}
            type="password"
            value={repeatPassword}
            isError={errorRepeatPassword}
            placeholder="Confirm password"
            onChange={(event) => setRepeatPassword(event.target.value)}
            required
          />
          {errorRepeatPassword && (
            <ErrorMessage method={repeatPasswordErr} errorText={errorRepeatPassword} />
          )}
        </div>
        <Button className={styles?.['sign']} type="submit">
          Create account
        </Button>
        <div className={styles?.['notification']}>
          Have an account?{' '}
          <Link to="/login" className={styles?.['link']}>
            Sign In
          </Link>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
