import {useMemo} from 'react';

import styles from './Button.module.scss';

function Button({className, children, myref, ...rest}) {
    const classNames = useMemo(() => {
        let str = styles['btn'];
        if (className) str += ` ${className}`;
        return str;
    }, [className]);

    return (
        <button className={classNames} ref={myref} {...rest}>
            {children}
        </button>
    )
}

export default Button;
