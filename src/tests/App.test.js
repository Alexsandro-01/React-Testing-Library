import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('1 - Teste se o topo da aplicação contém um conjunto fixo de links de navegação',
  () => {
    it('Testa o redirecionamento para a rota "/" ao clicar no link "Home"',
      () => {
        const { history } = renderWithRouter(<App />);
        const homeLink = screen.getByRole('link', { name: 'Home' });
        expect(homeLink).toBeDefined();

        userEvent.click(homeLink);
        const { location: { pathname } } = history;
        expect(pathname).toBe('/');
      });

    it('Testa o redirecionamento para a rota "/about" ao clicar no link "About"',
      () => {
        const { history } = renderWithRouter(<App />);
        const aboutLink = screen.getByRole('link', { name: 'About' });
        expect(aboutLink).toBeDefined();

        userEvent.click(aboutLink);
        const { location: { pathname } } = history;
        expect(pathname).toBe('/about');
      });

    it('Testa o redirecionamento para a rota "/favorites" ao clicar no link "Favorite"',
      () => {
        const { history } = renderWithRouter(<App />);
        const favoriteLink = screen.getByRole('link', { name: 'Favorite Pokémons' });
        expect(favoriteLink).toBeDefined();

        userEvent.click(favoriteLink);
        const { location: { pathname } } = history;
        expect(pathname).toBe('/favorites');
      });

    it('Testa o redirecionamento para a página "Not Found" em uma rota desconhecida',
      () => {
        const { history } = renderWithRouter(<App />);

        history.push('/pagina-aleatoria');
        const title = screen.getByRole('heading', {
          name: 'Page requested not found Crying emoji',
          level: 2,
        });

        expect(title).toBeDefined();
      });
  });
