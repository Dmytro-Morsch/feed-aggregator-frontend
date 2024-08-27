import { Link } from 'react-router-dom';

import styles from './NotFound.module.scss';

function NotFound() {
  return (
    <div className={styles['body']}>
      <div className={styles['container']}>
        <div className={styles['text']}>
          <h1 className={styles['h1']}>Page Not Found</h1>
          <p className={styles['description']}>
            We can&#39;t seem to find the page you&#39;re looking for. Please check the URL for any
            typos.
          </p>
          <ul className={styles['menu']}>
            <li className={styles['element']}>
              <Link className={styles['link']} to="/">
                Go to Homepage
              </Link>
            </li>
            <li className={styles['element']}>
              <a className={styles['link']} href="#">
                Visit our Blog
              </a>
            </li>
            <li className={styles['element']}>
              <a className={styles['link']} href="#">
                Contact support
              </a>
            </li>
          </ul>
        </div>
        <div>
          <img
            className={styles['image']}
            src="https://omjsblog.files.wordpress.com/2023/07/errorimg.png"
            alt=""
          />
        </div>
      </div>
    </div>
  );
}

export default NotFound;
