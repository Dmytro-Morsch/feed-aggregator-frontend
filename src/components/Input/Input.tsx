import { ChangeEvent, useMemo } from 'react';

import styles from './Input.module.scss';

interface InputProps {
  className?: string;
  isError?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  type?: 'text' | 'password' | 'email';
  placeholder?: string;
  readOnly?: boolean;
  disabled?: boolean;
  required?: boolean;
}

function Input({ className, onChange, isError, type, ...rest }: InputProps) {
  const classNames = useMemo(() => {
    let str = styles['input'];
    if (className) str += ` ${className}`;
    if (isError) str += ` ${styles['error']}`;
    return str;
  }, [className, isError]);

  return <input className={classNames} onChange={onChange} type={type} {...rest} />;
}

export default Input;
