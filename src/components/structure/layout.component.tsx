import React, { ReactNode } from 'react';

import { cn } from '../../helpers/utils';

const styles = {
    Screen: {
        // backgroundColor: '#161616',
        display: 'flex',
        position: 'relative' as const,
        // top: '400px',
    },
};

interface LayoutProps {
    children: ReactNode;
    hasAside?: boolean;
    asideContent?: ReactNode;
    fullWidth?: boolean;
    className?: string; // Added for more flexibility
}

const Layout: React.FC<LayoutProps> = ({
    children,
    hasAside = false,
    asideContent,
    fullWidth = false,
    className
}) => {
    return (
        <>
            <div style={styles.Screen}>
                {children}
            </div>
        </>
    );
};

export default Layout;