import Link from 'next/link';
import React, { PropsWithChildren } from 'react';
import './styles.css';

interface ButtonProps extends PropsWithChildren {
  navigateTo: string;
  onClick?: () => void;
}

export const NavigationButton: React.FC<ButtonProps> = ({ children, navigateTo, onClick }) => (
  <Link onClick={onClick} href={navigateTo} className="Button">
    {children}
  </Link>
);
