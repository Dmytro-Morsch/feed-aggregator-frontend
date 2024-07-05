import styles from './Home.module.scss';

function Home() {
    return (
        <div className={styles['main']}>
            <span className={styles['notification']}>You have <b>666</b> unread posts</span>
        </div>
    )
}

export default Home;
