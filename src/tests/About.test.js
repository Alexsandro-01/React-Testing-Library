import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('2 - Teste se a página "About" contém as informações sobre a Pokédex',
  () => {
    it('Teste se a página contém um heading h2 com o texto About Pokédex',
      () => {
        const { history } = renderWithRouter(<App />);
        history.push('/about');
        const title = screen.getByRole('heading', { name: 'About Pokédex' });
        expect(title).toBeDefined();
      });

    it('Teste se a página contém dois parágrafos com texto sobre a Pokédex',
      () => {
        const { history } = renderWithRouter(<App />);
        history.push('/about');
        const p1 = screen.getByText('This application simulates a Pokédex,'
          + ' a digital encyclopedia containing all Pokémons');
        const p2 = screen.getByText('One can filter Pokémons by type,'
          + ' and see more details for each one of them');
        expect(p1).toBeDefined();
        expect(p2).toBeDefined();
      });

    it('Teste se a página contém a seguinte imagem de uma Pokédex:',
      () => {
        const { history } = renderWithRouter(<App />);
        history.push('/about');
        const img = screen.getByAltText('Pokédex');
        expect(img.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
      });
  });
