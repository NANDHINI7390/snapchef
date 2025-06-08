import Link from 'next/link';
import Image from 'next/image';
import type { Recipe } from '@/lib/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, Users, ArrowRight } from 'lucide-react';

interface RecipeCardProps {
  recipe: Recipe;
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
  const recipeId = recipe.id || recipe.title.toLowerCase().replace(/\s+/g, '-');
  // In a real app, this link would go to a dynamic route like /recipe/[id]
  // For now, it's a placeholder or could link to a section on My Recipes if full display is there
  const recipeLink = `/my-recipes#${recipeId}`; 

  return (
    <Card className="flex flex-col h-full shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="p-0 relative">
        <Image
          src={recipe.imageUrl || `https://placehold.co/600x400.png?text=${encodeURIComponent(recipe.title)}`}
          alt={recipe.title}
          width={600}
          height={300}
          className="rounded-t-lg object-cover w-full h-48"
          data-ai-hint="recipe food"
        />
      </CardHeader>
      <CardContent className="flex-grow pt-6 space-y-3">
        <CardTitle className="font-headline text-xl line-clamp-2">{recipe.title}</CardTitle>
        {recipe.description && (
          <CardDescription className="line-clamp-3 text-sm">{recipe.description}</CardDescription>
        )}
        <div className="flex flex-wrap gap-2 pt-2">
          {recipe.prepTime && (
            <Badge variant="outline" className="text-xs">
              <Clock className="mr-1 h-3 w-3" /> Prep: {recipe.prepTime}
            </Badge>
          )}
          {recipe.cookTime && (
            <Badge variant="outline" className="text-xs">
              <Clock className="mr-1 h-3 w-3" /> Cook: {recipe.cookTime}
            </Badge>
          )}
          {recipe.servings && (
            <Badge variant="outline" className="text-xs">
              <Users className="mr-1 h-3 w-3" /> {recipe.servings}
            </Badge>
          )}
        </div>
      </CardContent>
      <CardFooter>
        {/* For a real app, this button would be more functional.
            If clicking the card itself navigates, button might not be needed or could be "View Details".
            Given it's a card in "My Recipes", it might be "View Full Recipe" or just part of clickable card.
        */}
        <Button variant="ghost" className="w-full text-primary" asChild>
           {/* This link is currently a placeholder for navigation */}
          <Link href={recipeLink}>
            View Recipe <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
