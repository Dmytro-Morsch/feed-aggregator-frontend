import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store.ts';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { patchUser } from '../../redux/userSlice.ts';

import api from '../../api';
import { setReceivedToken } from '../../redux/signInUpSlice.ts';
import UserType from '../../types/userType.ts';
import DeletePopup from '../../popups/DeletePopup/DeletePopup.tsx';
import useComponentVisible from '../../hooks/useCompontentVisible.tsx';
import Button from '../../components/Button/Button.tsx';
import Input from '../../components/Input/Input.tsx';
import NotificationPopup from '../../popups/NotificationPopup/NotificationPopup.tsx';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage.tsx';

import styles from './Settings.module.scss';

function Settings() {
  const user = useSelector((state: RootState) => state.userSlice.user);
  const dispatch: ThunkDispatch<RootState, undefined, Action> = useDispatch();

  const navigate = useNavigate();

  const [changePassword, setChangePassword] = useState(false);
  const [username, setUsername] = useState(user ? user.username : '');
  const [email, setEmail] = useState(user ? user.email : '');
  const [password, setPassword] = useState('');

  const [messageType, setMessageType] = useState('');

  const [emailErr, setEmailErr] = useState({});
  const [usernameErr, setUsernameErr] = useState({});
  const [passwordErr, setPasswordErr] = useState({});

  const errorEmail = useMemo(() => Object.keys(emailErr)[0], [emailErr]);
  const errorUsername = useMemo(() => Object.keys(usernameErr)[0], [usernameErr]);
  const errorPassword = useMemo(() => Object.keys(passwordErr)[0], [passwordErr]);

  const {
    ref: refNotificationPopup,
    isComponentVisible: isNotificationPopup,
    setIsComponentVisible: setNotificationPopup
  } = useComponentVisible(false);

  const {
    ref: refDeletePopup,
    isComponentVisible: isDeletePopup,
    setIsComponentVisible: setDeletePopup
  } = useComponentVisible(false);

  const isValid = () => {
    const emailErr: {
      emailRequired?: string | null;
    } = {};
    const usernameErr: {
      usernameRequired?: string | null;
    } = {};
    const passwordErr: {
      invalidPassword?: string | null;
    } = {};
    let isValid = true;

    if (email.trim().length <= 0) {
      emailErr.emailRequired = 'Email is required';
      isValid = false;
    }
    if (username.trim().length <= 0) {
      usernameErr.usernameRequired = 'Username is required';
      isValid = false;
    }
    if (password.trim().length) {
      const regExp = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
      if (!regExp.test(password)) {
        passwordErr.invalidPassword = 'Invalid password, please follow the tips';
        isValid = false;
      }
    }

    setEmailErr(emailErr);
    setUsernameErr(usernameErr);
    setPasswordErr(passwordErr);
    return isValid;
  };

  const handleUpdateUser = async () => {
    if (isValid()) {
      const payload: Pick<UserType, 'email' | 'username'> & Partial<Pick<UserType, 'password'>> = {
        email,
        username
      };

      if (password.length) payload.password = password;

      const answer = await dispatch(patchUser(payload));
      if (answer.meta.requestStatus === 'fulfilled') {
        setMessageType('success');
      } else {
        setMessageType('failed');
      }
      setNotificationPopup(true);
    }
  };

  const handleDeleteAccount = () => {
    (async () => {
      await api.users.deleteAccount();
      localStorage.removeItem('token');
      dispatch(setReceivedToken(false));
      navigate('/login');
    })();
  };

  useEffect(() => {
    document.title = 'CoN - Settings';
  }, []);

  return (
    <>
      {isNotificationPopup && (
        <NotificationPopup
          myref={refNotificationPopup}
          type={messageType}
          onClosePopup={() => setNotificationPopup(false)}
        />
      )}

      {isDeletePopup && (
        <DeletePopup
          myref={refDeletePopup}
          onDeleteAccount={handleDeleteAccount}
          onClosePopup={() => setDeletePopup(false)}
        />
      )}

      <div className={styles['toolbar']}>
        <h1 className={styles['title']}>Settings</h1>
        <hr className={styles['hr']} />
      </div>

      <div className={styles['form']}>
        <div className={styles['container']}>
          <div className={styles['element']}>
            <label className={`${styles['label']} ${errorUsername ? styles['def'] : ''}`}>
              Username
            </label>
            <div className={styles['input-container']}>
              <Input
                className={styles['input']}
                placeholder="Enter your username"
                type="text"
                value={username}
                isError={errorUsername}
                onChange={(event) => setUsername(event.target.value)}
              />
              {errorUsername && <ErrorMessage method={usernameErr} errorText={errorUsername} />}
            </div>
          </div>
          <div className={styles['element']}>
            <label className={`${styles['label']} ${errorEmail ? styles['def'] : ''}`}>Email</label>
            <div className={styles['input-container']}>
              <Input
                className={styles['input']}
                placeholder="Enter your email"
                type="email"
                value={email}
                isError={errorEmail}
                onChange={(event) => setEmail(event.target.value)}
              />
              {errorEmail && <ErrorMessage method={emailErr} errorText={errorEmail} />}
            </div>
          </div>
          <div className={styles['element']}>
            <label
              className={`${styles['label']} ${changePassword ? styles['password'] : ''} ${errorPassword ? styles['def'] : ''}`}>
              Password
            </label>
            {!changePassword ? (
              <Button className={styles['change-password']} onClick={() => setChangePassword(true)}>
                Change
              </Button>
            ) : (
              <div className={styles['input-container']}>
                <Input
                  className={styles['input']}
                  placeholder="Enter new password"
                  type="password"
                  value={password}
                  isError={errorPassword}
                  onChange={(event) => setPassword(event.target.value)}
                />
                {errorPassword && <ErrorMessage method={passwordErr} errorText={errorPassword} />}

                <ul className={styles['tips']}>
                  <li className={styles['tip']}>Your password must have at least 8 characters</li>
                  <li className={styles['tip']}>Your password must have at least one letter</li>
                  <li className={styles['tip']}>Your password must have at least one digit</li>
                  <li className={styles['tip']}>
                    Your password must have at least one special character [!@#$%^&*]
                  </li>
                </ul>
                <div className={styles['tip']}>
                  Your password will not be changed until you press the &#39;Save changes&#39;
                  button
                </div>
              </div>
            )}
          </div>
        </div>
        <div className={styles['btn-container']}>
          <Button className={styles['save']} onClick={handleUpdateUser}>
            Save changes
          </Button>
          <Button className={styles['delete']} onClick={() => setDeletePopup(true)}>
            Delete account
          </Button>
        </div>
      </div>
    </>
  );
}

export default Settings;
