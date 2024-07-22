import { useMemo } from 'react';

import styles from './NumberUnreadItems.module.scss';

interface NumberUnreadItemsProps {
  className?: string;
  count: number;
}

function NumberUnreadItems({ count, className }: NumberUnreadItemsProps) {
  const classNames = useMemo(() => {
    let str = styles['default'];
    if (className) str += ` ${styles[className]}`;
    return str;
  }, []);

  return <div className={classNames}>{count}</div>;
}

export default NumberUnreadItems;
