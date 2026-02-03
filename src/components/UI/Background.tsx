import styles from './Background.module.css';

export const Background = () => {
    return (
        <div className={styles.background}>
            <div className={styles.blobs}>
                <div className={`${styles.blob} ${styles.blob1}`} />
                <div className={`${styles.blob} ${styles.blob2}`} />
                <div className={`${styles.blob} ${styles.blob3}`} />
            </div>
            <div className={styles.overlay} />
        </div>
    );
};
