export interface Recipe {
  id: string; // Could be a hash of the title or generated
  title: string;
  description?: string;
  ingredients: string[];
  instructions: string[];
  prepTime?: string;
  cookTime?: string;
  servings?: string;
  imageUrl?: string; // Optional image URL for the recipe itself
  // Nutritional information can be added here if available
  // nutritionalInfo?: { calories?: string; protein?: string; carbs?: string; fat?: string };
}

export interface FavoriteRecipe extends Recipe {
  savedAt: string; // ISO date string
}
