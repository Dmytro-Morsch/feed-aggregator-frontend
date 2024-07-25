import { Link } from 'react-router-dom';
import { RootState } from '../../redux/store.ts';
import { useSelector } from 'react-redux';
import { MdArrowDropDown } from 'react-icons/md';

import useComponentVisible from '../../hooks/useCompontentVisible.tsx';
import Button from '../Button/Button.tsx';

import logo from '../../assets/logo.svg';

import styles from './Header.module.scss';

function Header() {
  const user = useSelector((state: RootState) => state.userSlice.user);

  const {
    ref: refPopup,
    isComponentVisible: isPopup,
    setIsComponentVisible: setPopup
  } = useComponentVisible(false);

  return (
    <nav className={styles['navbar']}>
      <div className={styles['navbar-brand']}>
        <a href="/" className={styles['logo']}>
          <img src={logo} alt="logo" />
          Collection of news
        </a>
      </div>

      <div className={styles['navbar-end']}>
        {!user ? (
          <div className={styles['auth']}>
            <Link to="/signup" className={styles['signup']}>
              Sign up
            </Link>
            <Link to="/login" className={styles['signin']}>
              Sign in
            </Link>
          </div>
        ) : (
          <div className={styles['dropdown']}>
            <Button
              myref={refPopup}
              className={styles['btn-user']}
              onClick={() => setPopup(!isPopup)}>
              {user.username}
              <MdArrowDropDown />
            </Button>

            {isPopup && (
              <ul id="dropdown-user" className={styles['menu-settings']}>
                <li className={styles['link']}>
                  <Link to="/users/edit">Manage Settings</Link>
                </li>
                <li className={styles['link']}>
                  <Link to="/manage/subscriptions">Manage Subscriptions</Link>
                </li>
                <hr className={styles['hr']} />
                <li className={styles['link']}>
                  <a href="#">Sign Out</a>
                </li>
              </ul>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Header;
