import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('5 - Teste o componente <Pokedex.js />', () => {
  it('Teste se página contém um heading h2 com o texto Encountered pokémons',
    () => {
      renderWithRouter(<App />);
      const title = screen.getByRole('heading', {
        name: 'Encountered pokémons',
        level: 2,
      });
      expect(title).toBeDefined();
    });

  it('Mostrar os Pokémons normalmente (sem filtros) quando o botão All for clicado',
    () => {
      renderWithRouter(<App />);

      const All = screen.getByRole('button', { name: 'All' });
      userEvent.click(All);

      const pokeActual = screen.getByText('Pikachu');
      expect(pokeActual).toBeInTheDocument();

      const btnNextPoke = screen.getByRole('button', {
        name: 'Próximo pokémon',
      });
      userEvent.click(btnNextPoke);

      const newPokeActual = screen.getByText('Charmander');
      expect(newPokeActual).toBeInTheDocument();

      const lastPokeActual = screen.queryByText('Pikachu');
      expect(lastPokeActual).toBeNull();
    });

  it('O 1º Pokémon deve ser mostrado ao clicar no botão, se estiver no último Pokémon',
    () => {
      renderWithRouter(<App />);
      const fireFilter = screen.getByRole('button', {
        name: 'Fire',
      });
      userEvent.click(fireFilter);

      const pokeActual = screen.getByText('Charmander');
      expect(pokeActual).toBeInTheDocument();

      const btnNextPoke = screen.getByRole('button', {
        name: 'Próximo pokémon',
      });
      userEvent.click(btnNextPoke);

      const newPokeActual = screen.getByText('Rapidash');
      expect(newPokeActual).toBeInTheDocument();

      userEvent.click(btnNextPoke);
      expect(pokeActual).toBeInTheDocument();
    });

  it('Deve existir um botão de filtragem para cada tipo de Pokémon, sem repetição',
    () => {
      renderWithRouter(<App />);
      const All = screen.getByRole('button', { name: 'All' });
      const filterBtn = screen.getAllByTestId('pokemon-type-button');

      expect(filterBtn[0]).toBeInTheDocument();
      expect(filterBtn[1]).toBeInTheDocument();
      expect(filterBtn[2]).toBeInTheDocument();
      expect(filterBtn[3]).toBeInTheDocument();
      expect(filterBtn[4]).toBeInTheDocument();
      expect(filterBtn[5]).toBeInTheDocument();
      expect(filterBtn[6]).toBeInTheDocument();
      expect(All).toBeInTheDocument();
    });
});
