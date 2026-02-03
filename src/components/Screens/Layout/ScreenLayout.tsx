import React from 'react';
import { motion } from 'framer-motion';
import { LayoutGrid, FileText, Settings, Bell, Search, UserCircle } from 'lucide-react';
import { Actor } from '../../../data/steps';
import styles from './ScreenLayout.module.css';

interface ScreenLayoutProps {
    role: Actor;
    title: string;
    children: React.ReactNode;
}

export const ScreenLayout: React.FC<ScreenLayoutProps> = ({ role, title, children }) => {
    const getSidebarClass = () => {
        switch (role) {
            case 'BD': return styles.sidebarBD;
            case 'PM': return styles.sidebarPM;
            case 'System': return styles.sidebarSystem;
            default: return '';
        }
    };

    return (
        <div className={styles.container}>
            {/* Sidebar */}
            <div className={`${styles.sidebar} ${getSidebarClass()}`}>
                <div className={styles.sidebarHeader}>
                    <div className={styles.logoArea}>
                        <div className={styles.logoBox}>
                            <LayoutGrid size={18} />
                        </div>
                        <span className={styles.appName}>FTG Portal</span>
                    </div>
                </div>

                <nav className={styles.nav}>
                    <NavItem icon={<FileText size={18} />} label="Nominations" active={true} />
                    <NavItem icon={<Bell size={18} />} label="Notifications" />
                    <NavItem icon={<Settings size={18} />} label="Settings" />
                </nav>

                <div className={styles.profile}>
                    <div className={styles.profileCard}>
                        <UserCircle size={32} className="text-white/60" />
                        <div className={styles.profileInfo}>
                            <span className={styles.roleLabel}>Current Role</span>
                            <span className={styles.roleName}>{role === 'BD' ? 'Business Dev.' : role === 'PM' ? 'Program Mgr.' : 'SAP System'}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className={styles.main}>
                {/* Top Header */}
                <header className={styles.header}>
                    <h2 className={styles.pageTitle}>{title}</h2>
                    <div className={styles.headerActions}>
                        <div className={styles.searchBox}>
                            <Search size={18} className={styles.searchIcon} />
                            <input
                                type="text"
                                placeholder="Search..."
                                className={styles.searchInput}
                            />
                        </div>
                        <div className={styles.avatar} />
                    </div>
                </header>

                {/* Content Area */}
                <main className={styles.contentWrapper}>
                    <motion.div
                        key={title} // Animate when title/screen changes
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.2 }}
                        style={{ height: '100%' }}
                    >
                        {children}
                    </motion.div>
                </main>
            </div>
        </div>
    );
};

const NavItem = ({ icon, label, active = false }: { icon: React.ReactNode, label: string, active?: boolean }) => (
    <button className={`${styles.navItem} ${active ? styles.navItemActive : styles.navItemInactive}`}>
        {icon}
        {label}
    </button>
);
