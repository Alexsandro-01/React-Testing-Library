import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import pokemons from '../data';

const URL = '/pokemons/25';

describe('7 - Teste se as informações detalhadas do Pokémon selecionado são mostradas',
  () => {
    it('A página deve conter um texto <name> Details, onde <name> é o nome do Pokémon',
      () => {
        const { history } = renderWithRouter(<App />);
        history.push(URL);
        const detail = screen.getByText('Pikachu Details');
        expect(detail).toBeDefined();
      });

    it('Não deve existir o link de navegação para os detalhes do Pokémon selecionado',
      () => {
        const { history } = renderWithRouter(<App />);
        history.push(URL);
        const link = screen.queryByText('More details');
        expect(link).toBeNull();
      });

    it('A seção de detalhes deve conter um heading h2 com o texto Summary',
      () => {
        const { history } = renderWithRouter(<App />);
        history.push(URL);
        const summary = screen.getByRole('heading', { name: 'Summary', level: 2 });
        expect(summary).toBeDefined();
      });

    it('deve ter um parágrafo com o resumo do Pokémon sendo visualizado',
      () => {
        const { history } = renderWithRouter(<App />);
        history.push(URL);
        const resume = screen.getByText('This intelligent Pokémon roasts '
          + 'hard berries with electricity to make them tender enough to eat.');
        expect(resume).toBeDefined();
      });

    it('Teste se existe uma seção com os mapas contendo as localizações do pokémon',
      () => {
        const { history } = renderWithRouter(<App />);
        history.push(URL);

        const title = screen.getByText('Game Locations of Pikachu');
        expect(title).toBeDefined();

        pokemons[0].foundAt.forEach((loc) => {
          const location = screen.getByText(loc.location);
          const image = screen.getAllByAltText('Pikachu location');
          const imgActual = image.find((img) => img.src === loc.map);

          expect(location).toBeDefined();
          expect(imgActual.src).toBe(loc.map);
        });
      });

    it('A página deve exibir um checkbox que permite favoritar o Pokémon',
      () => {
        const { history } = renderWithRouter(<App />);
        history.push(URL);

        const check = screen.getByRole('checkbox');
        expect(check).toBeDefined();

        const favIcon = screen.queryByAltText('Pikachu is marked as favorite');
        expect(favIcon).toBeNull();

        userEvent.click(check);
        const favIconVisible = screen.queryByAltText('Pikachu is marked as favorite');
        expect(favIconVisible.src).toBe('http://localhost/star-icon.svg');

        const label = screen.getByLabelText('Pokémon favoritado?');
        expect(label).toBeDefined();
      });
  });
