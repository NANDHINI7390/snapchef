'use client';

import type { Recipe } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { useFavorites } from '@/hooks/useFavorites';
import { Heart, Clock, Users, List, ClipboardList, Utensils, Info } from 'lucide-react';
import Image from 'next/image';
import { useToast } from "@/hooks/use-toast";

interface RecipeDisplayProps {
  recipe: Recipe;
}

export default function RecipeDisplay({ recipe }: RecipeDisplayProps) {
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const { toast } = useToast();
  const recipeId = recipe.id || recipe.title.toLowerCase().replace(/\s+/g, '-');

  const handleToggleFavorite = () => {
    if (isFavorite(recipeId)) {
      removeFavorite(recipeId);
      toast({ title: "Recipe removed from favorites!" });
    } else {
      addFavorite({ ...recipe, id: recipeId });
      toast({ title: "Recipe saved to favorites!" });
    }
  };

  return (
    <Card className="w-full shadow-xl">
      <CardHeader className="p-0">
        {recipe.imageUrl ? (
          <Image
            src={recipe.imageUrl}
            alt={recipe.title}
            width={800}
            height={400}
            className="rounded-t-lg object-cover w-full h-64"
            data-ai-hint="food recipe"
          />
        ) : (
          <Image
            src={`https://placehold.co/800x400.png`}
            alt="Placeholder image for recipe"
            width={800}
            height={400}
            className="rounded-t-lg object-cover w-full h-64"
            data-ai-hint="delicious meal"
          />
        )}
         <div className="p-6">
          <CardTitle className="font-headline text-3xl mb-2">{recipe.title}</CardTitle>
          {recipe.description && <CardDescription className="text-lg mb-4">{recipe.description}</CardDescription>}
         </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
          {recipe.prepTime && (
            <Badge variant="secondary" className="flex items-center gap-1 py-1 px-2">
              <Clock className="h-4 w-4" /> Prep: {recipe.prepTime}
            </Badge>
          )}
          {recipe.cookTime && (
            <Badge variant="secondary" className="flex items-center gap-1 py-1 px-2">
              <Clock className="h-4 w-4" /> Cook: {recipe.cookTime}
            </Badge>
          )}
          {recipe.servings && (
            <Badge variant="secondary" className="flex items-center gap-1 py-1 px-2">
              <Users className="h-4 w-4" /> {recipe.servings}
            </Badge>
          )}
        </div>

        <div>
          <h3 className="font-headline text-xl mb-3 flex items-center gap-2"><List />Ingredients:</h3>
          <ul className="list-disc list-inside space-y-1 pl-2 columns-1 md:columns-2">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-headline text-xl mb-3 flex items-center gap-2"><ClipboardList />Instructions:</h3>
          <Accordion type="single" collapsible className="w-full">
            {recipe.instructions.map((step, index) => (
              <AccordionItem value={`item-${index}`} key={index}>
                <AccordionTrigger className="text-left hover:no-underline">
                  <span className="font-semibold mr-2">Step {index + 1}</span>
                </AccordionTrigger>
                <AccordionContent className="pb-4 pt-2">
                  {step}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        
        <div>
          <h3 className="font-headline text-xl mb-3 flex items-center gap-2"><Info />Nutritional Information:</h3>
          <p className="text-muted-foreground italic">Nutritional information is not available for this recipe yet.</p>
        </div>

      </CardContent>
      <CardFooter>
        <Button onClick={handleToggleFavorite} variant={isFavorite(recipeId) ? "destructive" : "default"} className="w-full md:w-auto">
          <Heart className="mr-2 h-4 w-4" />
          {isFavorite(recipeId) ? 'Remove from Favorites' : 'Save to Favorites'}
        </Button>
      </CardFooter>
    </Card>
  );
}
