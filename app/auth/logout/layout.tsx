import { PropsWithChildren } from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Logout',
};

function Layout({ children }: PropsWithChildren) {
  return children;
}

export default Layout;
