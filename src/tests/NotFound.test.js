import React from 'react';
import { render, screen } from '@testing-library/react';
// import renderWithRouter from './renderWithRouter';
import NotFound from '../components/NotFound';

describe('Teste o componente <NotFound.js />', () => {
  it('Teste se página contém um heading `h2` com o texto `Page requested not found 😭',
    () => {
      render(<NotFound />);
      const title = screen.getByRole('heading', {
        name: 'Page requested not found Crying emoji',
        level: 2,
      });
      const image = screen
        .getByAltText('Pikachu crying because the page requested was not found');
      expect(title).toBeDefined();
      expect(image.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
    });
});
