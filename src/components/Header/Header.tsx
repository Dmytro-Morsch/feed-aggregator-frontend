import { Link, useNavigate } from 'react-router-dom';
import { RootState } from '../../redux/store.ts';
import { useDispatch, useSelector } from 'react-redux';
import { MdArrowDropDown } from 'react-icons/md';

import useComponentVisible from '../../hooks/useCompontentVisible.tsx';
import Button from '../Button/Button.tsx';

import logo from '../../assets/logo.svg';

import styles from './Header.module.scss';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { setReceivedToken } from '../../redux/signInUpSlice.ts';

function Header() {
  const user = useSelector((state: RootState) => state.userSlice.user);
  const dispatch: ThunkDispatch<RootState, undefined, Action> = useDispatch();
  const navigate = useNavigate();

  const {
    ref: refPopup,
    isComponentVisible: isPopup,
    setIsComponentVisible: setPopup
  } = useComponentVisible(false);

  const handleSignOut = () => {
    localStorage.removeItem('token');
    dispatch(setReceivedToken(false));
    navigate('/login');
    setPopup(false);
  };

  return (
    <nav className={styles['navbar']}>
      <div className={styles['navbar-brand']}>
        <Link to="/" className={styles['logo']}>
          <img src={logo} alt="logo" />
          Collection of news
        </Link>
      </div>

      <div className={styles['navbar-end']} ref={refPopup}>
        {user && (
          <div className={styles['dropdown']}>
            <Button className={styles['btn-user']} onClick={() => setPopup(!isPopup)}>
              {user.username}
              <MdArrowDropDown />
            </Button>

            {isPopup && (
              <ul id="dropdown-user" className={styles['menu-settings']}>
                <li className={styles['element']}>
                  <Link className={styles['link']} to="/users/edit" onClick={() => setPopup(false)}>
                    Manage Settings
                  </Link>
                </li>
                <li className={styles['element']}>
                  <Link
                    className={styles['link']}
                    to="/manage/subscriptions"
                    onClick={() => setPopup(false)}>
                    Manage Subscriptions
                  </Link>
                </li>
                <hr className={styles['hr']} />
                <li className={styles['element']}>
                  <button className={styles['link']} onClick={handleSignOut}>
                    Sign Out
                  </button>
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
