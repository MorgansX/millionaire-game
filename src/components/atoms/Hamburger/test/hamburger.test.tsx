import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Hamburger } from '../index';

describe('Hamburger Component', () => {
  it('renders correctly', () => {
    render(<Hamburger />);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).toHaveAttribute('id', 'menu-toggle');
    expect(checkbox).toHaveClass('MenuToggle');

    const label = screen.getByLabelText('Toggle menu');
    expect(label).toBeInTheDocument();
    expect(label).toHaveClass('HamburgerButton');
    expect(label).toHaveAttribute('for', 'menu-toggle');

    const spans = label.querySelectorAll('span');
    expect(spans.length).toBe(3);
  });

  it('toggles checked state when clicked', () => {
    render(<Hamburger />);

    const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
    expect(checkbox.checked).toBe(false);

    const label = screen.getByLabelText('Toggle menu');
    fireEvent.click(label);

    expect(checkbox.checked).toBe(true);

    fireEvent.click(label);
    expect(checkbox.checked).toBe(false);
  });

  it('toggles when clicking the checkbox directly', () => {
    render(<Hamburger />);

    const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
    expect(checkbox.checked).toBe(false);

    fireEvent.click(checkbox);
    expect(checkbox.checked).toBe(true);

    fireEvent.click(checkbox);
    expect(checkbox.checked).toBe(false);
  });
});
