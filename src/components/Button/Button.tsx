import { MutableRefObject, ReactNode, useMemo } from 'react';

import styles from './Button.module.scss';

interface ButtonProps {
  className?: string;
  myref?: MutableRefObject<any>;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  onClick?: () => void;
  children: ReactNode;
}

function Button({ className, children, myref, ...rest }: ButtonProps) {
  const classNames = useMemo(() => {
    let str = styles['btn'];
    if (className) str += ` ${className}`;
    return str;
  }, [className]);

  return (
    <button className={classNames} ref={myref} {...rest}>
      {children}
    </button>
  );
}

export default Button;
