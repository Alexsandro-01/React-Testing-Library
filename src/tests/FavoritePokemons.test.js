import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import pokemons from '../data';

describe('3 - Teste o componente <FavoritePokemons.js />', () => {
  it('É exibida a mensagem No favorite pokemon found, se não tiver pokémons favoritos',
    () => {
      renderWithRouter(<FavoritePokemons pokemons={ [] } />);

      const notFavorites = screen.getByText('No favorite pokemon found');
      expect(notFavorites).toBeDefined();
    });

  it('Teste se é exibido todos os cards de pokémons favoritados',
    () => {
      renderWithRouter(<FavoritePokemons pokemons={ [pokemons[0], pokemons[1]] } />);

      const pokeName1 = screen.getByText('Pikachu');
      const image1 = screen.getByAltText('Pikachu sprite');
      const favoriteIcon1 = screen.getByAltText('Pikachu is marked as favorite');
      expect(pokeName1).toBeInTheDocument();
      expect(image1).toBeInTheDocument();
      expect(favoriteIcon1).toBeInTheDocument();

      const pokeName2 = screen.getByText('Charmander');
      const image2 = screen.getByAltText('Charmander sprite');
      const favoriteIcon2 = screen.getByAltText('Charmander is marked as favorite');
      expect(pokeName2).toBeInTheDocument();
      expect(image2).toBeInTheDocument();
      expect(favoriteIcon2).toBeInTheDocument();
    });
});
