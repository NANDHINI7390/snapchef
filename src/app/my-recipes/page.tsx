'use client';

import { useFavorites } from '@/hooks/useFavorites';
import RecipeCard from '@/components/snapchef/RecipeCard';
import RecipeDisplay from '@/components/snapchef/RecipeDisplay';
import LoadingSpinner from '@/components/snapchef/LoadingSpinner';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { HeartCrack, ChefHat, ArrowLeft } from 'lucide-react';
import { useState, useEffect } from 'react';
import type { FavoriteRecipe } from '@/lib/types';


export default function MyRecipesPage() {
  const { favorites, isLoaded, removeFavorite } = useFavorites();
  const [selectedRecipe, setSelectedRecipe] = useState<FavoriteRecipe | null>(null);
  const [hash, setHash] = useState<string | null>(null);

  useEffect(() => {
    const handleHashChange = () => {
      const currentHash = window.location.hash.substring(1);
      setHash(currentHash);
      if (currentHash) {
        const recipeToSelect = favorites.find(fav => fav.id === currentHash);
        setSelectedRecipe(recipeToSelect || null);
      } else {
        setSelectedRecipe(null);
      }
    };

    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [favorites]);

  useEffect(() => {
    if (selectedRecipe && !favorites.find(fav => fav.id === selectedRecipe.id)) {
      setSelectedRecipe(null);
    }
  }, [favorites, selectedRecipe]);


  if (!isLoaded) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] animate-fade-in">
        <LoadingSpinner size={48} />
        <p className="mt-4 text-lg text-muted-foreground">Loading your favorite recipes...</p>
      </div>
    );
  }
  
  const handleSelectRecipe = (recipe: FavoriteRecipe) => {
    setSelectedRecipe(recipe);
    window.location.hash = recipe.id || recipe.title.toLowerCase().replace(/\s+/g, '-');
  };

  const handleCloseRecipeDisplay = () => {
    setSelectedRecipe(null);
    window.location.hash = '';
  }


  if (selectedRecipe) {
    return (
      <div className="space-y-8 animate-fade-in">
        <Button onClick={handleCloseRecipeDisplay} variant="outline" className="mb-4 group">
          <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" /> Back to My Recipes
        </Button>
        <RecipeDisplay recipe={selectedRecipe} />
      </div>
    )
  }


  return (
    <div className="space-y-8 animate-fade-in">
      <h1 className="text-4xl font-headline font-bold text-center animate-slide-in-up">My Favorite Recipes</h1>
      {favorites.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center py-12 border-2 border-dashed rounded-lg animate-fade-in" style={{animationDelay: '0.2s'}}>
          <HeartCrack className="w-16 h-16 text-muted-foreground mb-4" />
          <p className="text-xl text-muted-foreground mb-2">You haven't saved any favorite recipes yet.</p>
          <p className="text-md text-muted-foreground mb-6">Start exploring and find recipes you love!</p>
          <Button asChild size="lg">
            <Link href="/" className="flex items-center gap-2">
              <ChefHat className="h-5 w-5" /> Discover Recipes
            </Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {favorites.map((recipe, index) => (
            <div 
              key={recipe.id || recipe.title} 
              onClick={() => handleSelectRecipe(recipe)} 
              className="cursor-pointer animate-slide-in-up"
              style={{animationDelay: `${index * 0.1}s`}}
            >
              <RecipeCard recipe={recipe} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
