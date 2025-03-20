import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { NavigationButton } from '../index';

jest.mock('next/link', () => {
  return function MockLink({
    href,
    className,
    children,
  }: {
    href: string;
    className: string;
    children: React.ReactNode;
  }) {
    return (
      <a displayName={'MockLink'} href={href} className={className} data-testid="mock-link">
        {children}
      </a>
    );
  };
});

describe('NavigationButton test', () => {
  test('renders Link with proper href', () => {
    const testUrl = '/test-page';
    render(<NavigationButton navigateTo={testUrl}>Тестова кнопка</NavigationButton>);

    const linkElement = screen.getByTestId('mock-link');
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', testUrl);
  });

  test('renders Link with proper class name', () => {
    render(<NavigationButton navigateTo="/some-page">Тестова кнопка</NavigationButton>);

    const linkElement = screen.getByTestId('mock-link');
    expect(linkElement).toHaveClass('Button');
  });

  test('renders children text', () => {
    const buttonText = 'click me';
    render(<NavigationButton navigateTo="/some-page">{buttonText}</NavigationButton>);

    const linkElement = screen.getByText(buttonText);
    expect(linkElement).toBeInTheDocument();
  });
});
