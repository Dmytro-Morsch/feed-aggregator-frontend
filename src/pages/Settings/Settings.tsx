import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store.ts';

import Button from '../../components/Button/Button.tsx';

import styles from './Settings.module.scss';

function Settings() {
  const user = useSelector((state: RootState) => state.userSlice.user);

  const [changePassword, setChangePassword] = useState(false);
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState('');

  return (
    <>
      <div className={styles['toolbar']}>
        <h1 className={styles['title']}>Settings</h1>
        <hr className={styles['hr']} />
      </div>
      <form className={styles['form']}>
        <div className={styles['container']}>
          <div className={styles['element']}>
            <label className={styles['label']}>Username</label>
            <div className={styles['input-container']}>
              <input
                className={styles['input']}
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
              <input
                className={styles['input']}
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>
          </div>
          <div className={styles['element']}>
            <label className={styles['label']}>Password</label>
            {!changePassword ? (
              <Button
                className={styles['btn-change-password']}
                onClick={() => setChangePassword(true)}>
                Change
              </Button>
            ) : (
              <div className={styles['input-container']}>
                <input
                  className={styles['input']}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  type="password"
                />
              </div>
            )}
          </div>
        </div>
        <Button className={styles['btn-save']} type="submit">
          Save changes
        </Button>
      </form>
    </>
  );
}

export default Settings;
