import styles from './Auth.module.scss';
import SignIn from './components/SignIn.tsx';
import SignUp from './components/SignUp.tsx';

interface AuthProps {
  view: 'sign-in' | 'sign-up';
}

function Auth({ view }: AuthProps) {
  return (
    <div className={styles['wrapper']}>
      {view === 'sign-in' && <SignIn styles={styles} />}
      {view === 'sign-up' && <SignUp styles={styles} />}
    </div>
  );
}

export default Auth;
