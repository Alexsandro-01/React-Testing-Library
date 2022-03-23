import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import Pokemon from '../components/Pokemon';
import pokemons from '../data';

describe('6 - Teste se é renderizado um card com as informações de determinado pokémon',
  () => {
    it('Testa se o nome, peso médio e a imagem do Pokemon são exibidos', () => {
      renderWithRouter(<Pokemon
        pokemon={ pokemons[0] }
        showDetailsLink={ false }
        isFavorite
      />);

      const pokeName = screen.getByText('Pikachu');
      const pokeType = screen.getByText('Electric');
      const pokeWeight = screen.getByText('Average weight: 6.0 kg');
      const image = screen.getByAltText('Pikachu sprite');

      expect(pokeName).toBeInTheDocument();
      expect(pokeType).toBeInTheDocument();
      expect(pokeWeight).toBeInTheDocument();
      expect(image.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    });

    it('Testa se o card do Pokémon contém um link com URL "/pokemons/<id>"', () => {
      const { history } = renderWithRouter(<Pokemon
        pokemon={ pokemons[0] }
        showDetailsLink
        isFavorite
      />);

      const link = screen.getByRole('link', { name: 'More details' });
      expect(link).toBeInTheDocument();
      userEvent.click(link);
      const { location: { pathname } } = history;
      expect(pathname).toBe('/pokemons/25');
    });

    it('Teste se existe um ícone de estrela nos Pokémons favoritados', () => {
      renderWithRouter(<Pokemon
        pokemon={ pokemons[0] }
        showDetailsLink
        isFavorite
      />);

      const favIcon = screen.getByAltText('Pikachu is marked as favorite');
      expect(favIcon).toBeInTheDocument();
      expect(favIcon.src).toBe('http://localhost/star-icon.svg');
    });
  });
