
'use client';

import type { Recipe } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { useFavorites } from '@/hooks/useFavorites';
import { Heart, Clock, Users, List, ClipboardList, Info, Image as ImageIcon, LoaderCircle } from 'lucide-react';
import NextImage from 'next/image'; // Renamed to avoid conflict with Lucide icon
import { useToast } from "@/hooks/use-toast";

interface RecipeDisplayProps {
  recipe: Recipe;
  isLoadingImage?: boolean;
}

export default function RecipeDisplay({ recipe, isLoadingImage = false }: RecipeDisplayProps) {
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
    <Card className="w-full shadow-xl animate-fade-in">
      <CardHeader className="p-0">
        <div className="w-full aspect-video bg-muted rounded-t-lg overflow-hidden relative max-h-[400px] md:max-h-[450px]">
          {isLoadingImage ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-primary">
              <LoaderCircle className="h-12 w-12 animate-spin" />
              <p className="mt-2 text-sm font-semibold">Generating Image...</p>
            </div>
          ) : recipe.imageUrl ? (
            <NextImage
              src={recipe.imageUrl}
              alt={recipe.title}
              layout="fill"
              objectFit="cover"
              className="rounded-t-lg"
              data-ai-hint="recipe dish food"
              priority
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground">
              <ImageIcon className="h-12 w-12" />
              <p className="mt-2 text-sm">No image available</p>
            </div>
          )}
        </div>
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
                <AccordionTrigger className="text-left hover:no-underline text-base">
                  <span className="font-semibold mr-2">Step {index + 1}</span>
                </AccordionTrigger>
                <AccordionContent className="pb-4 pt-2 text-muted-foreground">
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
