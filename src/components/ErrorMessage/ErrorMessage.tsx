import { MdWarningAmber } from 'react-icons/md';

import styles from './ErrorMessage.module.scss';

interface ErrorMessageProps {
  method: any;
  errorText: string;
}

function ErrorMessage({ method, errorText }: ErrorMessageProps) {
  return (
    <div className={styles['error-message']}>
      <MdWarningAmber className={`${styles['icon']} ${styles['i-error']}`} />
      <div className={styles['error-text']}>{method[errorText]}</div>
    </div>
  );
}

export default ErrorMessage;
