// src/ui/layout/Layout.tsx
import React from 'react';
import './Layout.module.css';

const Layout: React.FC = ({ children }) => {
    return <div className="layout">{children}</div>;
};

export default Layout;
