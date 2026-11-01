import AppLayout from '@/components/layouts/app-layout';
import React from 'react';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return <AppLayout>{children}</AppLayout>;
};

export default MainLayout;
