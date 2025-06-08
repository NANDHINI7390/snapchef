// src/hooks/useFavorites.ts
"use client";

import { useState, useEffect, useCallback } from 'react';
import type { FavoriteRecipe, Recipe } from '@/lib/types';

const FAVORITES_KEY = 'snapchef_favorites';

export function useFavorites() {
  const [favorites, setFavorites] = useState<FavoriteRecipe[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const storedFavorites = localStorage.getItem(FAVORITES_KEY);
        if (storedFavorites) {
          setFavorites(JSON.parse(storedFavorites));
        }
      } catch (error) {
        console.error("Error loading favorites from localStorage:", error);
        setFavorites([]); // Reset to empty if error
      }
      setIsLoaded(true);
    }
  }, []);

  const saveFavorites = useCallback((updatedFavorites: FavoriteRecipe[]) => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
        setFavorites(updatedFavorites);
      } catch (error) {
        console.error("Error saving favorites to localStorage:", error);
      }
    }
  }, []);

  const addFavorite = useCallback((recipe: Recipe) => {
    // Generate a simple ID for the favorite if the recipe doesn't have one
    const recipeId = recipe.id || recipe.title.toLowerCase().replace(/\s+/g, '-');
    
    if (favorites.find(fav => fav.id === recipeId)) {
      // Already a favorite or ID collision (unlikely with timestamp)
      return;
    }
    const newFavorite: FavoriteRecipe = {
      ...recipe,
      id: recipeId, // Ensure ID is set
      savedAt: new Date().toISOString(),
    };
    saveFavorites([...favorites, newFavorite]);
  }, [favorites, saveFavorites]);

  const removeFavorite = useCallback((recipeId: string) => {
    saveFavorites(favorites.filter(fav => fav.id !== recipeId));
  }, [favorites, saveFavorites]);

  const isFavorite = useCallback((recipeId: string) => {
    return !!favorites.find(fav => fav.id === recipeId);
  }, [favorites]);

  return { favorites, addFavorite, removeFavorite, isFavorite, isLoaded };
}
