import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Play } from 'lucide-react';
import styles from './Hero.module.css';

interface HeroProps {
    onStart: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStart }) => {
    return (
        <div className={styles.container}>
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className={styles.content}
            >
                <span className={styles.badge}>
                    FTG Process Visualizer
                </span>

                <h1 className={styles.title}>
                    FTG Commercial Lifecycle
                </h1>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onStart}
                    className={styles.startBtn}
                >
                    <Play size={20} fill="currentColor" />
                    Start Interactive Demo
                </motion.button>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className={styles.scrollIndicator}
            >
                <span>Ready to begin</span>
                <ChevronDown className={styles.bounce} />
            </motion.div>
        </div>
    );
};
