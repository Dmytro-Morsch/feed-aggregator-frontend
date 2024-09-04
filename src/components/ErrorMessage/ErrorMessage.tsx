import { MdWarningAmber } from 'react-icons/md';

import styles from './ErrorMessage.module.scss';

interface ErrorMessageProps {
  method: any;
  errorText: string;
}

function ErrorMessage({ method, errorText }: ErrorMessageProps) {
  return (
    <div className={styles['error-message']}>
      <div className={styles['icon-container']}>
        <MdWarningAmber className={styles['icon']} />
      </div>
      <div className={styles['error-text']}>{method[errorText]}</div>
    </div>
  );
}

export default ErrorMessage;
