import {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store.ts';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { patchUser } from '../../redux/userSlice.ts';

import UserType from '../../types/userType.ts';
import Button from '../../components/Button/Button.tsx';
import Input from '../../components/Input/Input.tsx';

import styles from './Settings.module.scss';

function Settings() {
  const user: UserType = useSelector((state: RootState) => state.userSlice.user);
  const dispatch: ThunkDispatch<RootState, undefined, Action> = useDispatch();

  const [changePassword, setChangePassword] = useState(false);
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState('');

  const handleUpdateUser = () => {
    const payload: Pick<UserType, 'email' | 'username'> & Partial<Pick<UserType, 'password'>> = {
      email,
      username
    };

    if (password.length) payload.password = password;

    dispatch(patchUser(payload));
  };

  useEffect(() => {
    document.title = 'CoN - Settings';
  }, []);

  return (
    <>
      <div className={styles['toolbar']}>
        <h1 className={styles['title']}>Settings</h1>
        <hr className={styles['hr']} />
      </div>

      <div className={styles['form']}>
        <div className={styles['container']}>
          <div className={styles['element']}>
            <label className={styles['label']}>Username</label>
            <div className={styles['input-container']}>
              <Input
                className={styles['input']}
                placeholder="Enter your username"
                type="text"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                required
              />
            </div>
          </div>
          <div className={styles['element']}>
            <label className={styles['label']}>Email</label>
            <div className={styles['input-container']}>
              <Input
                className={styles['input']}
                placeholder="Enter your email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>
          </div>
          <div className={styles['element']}>
            <label className={`${styles['label']} ${changePassword ? styles['password'] : ''}`}>
              Password
            </label>
            {!changePassword ? (
              <Button
                className={styles['btn-change-password']}
                onClick={() => setChangePassword(true)}>
                Change
              </Button>
            ) : (
              <div className={styles['input-container']}>
                <Input
                  className={styles['input']}
                  placeholder="Enter new password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
                <div className={styles['notification']}>
                  Your password will not be changed until you press the &#39;Save changes&#39;
                  button
                </div>
              </div>
            )}
          </div>
        </div>
        <div className={styles['btn-container']}>
          <Button className={styles['btn-save']} onClick={handleUpdateUser}>
            Save changes
          </Button>
        </div>
      </div>
    </>
  );
}

export default Settings;
