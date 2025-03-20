import Link from 'next/link';
import React, { PropsWithChildren } from 'react';
import './styles.css';

interface ButtonProps extends PropsWithChildren {
  navigateTo: string;
}

export const NavigationButton: React.FC<ButtonProps> = ({ children, navigateTo }) => (
  <Link href={navigateTo} className="Button">
    {children}
  </Link>
);
