import { ReactNode } from 'react';
import styles from './Layout.module.css';

interface LayoutProps {
    children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    return <div className={styles.layout}>{children}</div>;
};

export default Layout;
