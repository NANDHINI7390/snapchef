// src/components/snapchef/ImageUploadForm.tsx
"use client";

import { useState, useRef, ChangeEvent, FormEvent } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { identifyIngredients, IdentifyIngredientsOutput } from '@/ai/flows/identify-ingredients';
import { generateRecipe, GenerateRecipeOutput } from '@/ai/flows/generate-recipe';
import RecipeDisplay from '@/components/snapchef/RecipeDisplay';
import LoadingSpinner from '@/components/snapchef/LoadingSpinner';
import { useToast } from "@/hooks/use-toast";
import { UploadCloud, Sparkles, ChefHat, AlertCircle, List } from 'lucide-react';
import type { Recipe } from '@/lib/types';


export default function ImageUploadForm() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [identifiedIngredients, setIdentifiedIngredients] = useState<string[] | null>(null);
  const [generatedRecipe, setGeneratedRecipe] = useState<Recipe | null>(null);
  const [isLoadingIngredients, setIsLoadingIngredients] = useState(false);
  const [isLoadingRecipe, setIsLoadingRecipe] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setIdentifiedIngredients(null);
        setGeneratedRecipe(null);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitIngredients = async (event: FormEvent) => {
    event.preventDefault();
    if (!imageFile || !imagePreview) {
      setError("Please select an image first.");
      return;
    }

    setError(null);
    setIsLoadingIngredients(true);
    setIdentifiedIngredients(null);
    setGeneratedRecipe(null);

    try {
      const result: IdentifyIngredientsOutput = await identifyIngredients({ photoDataUri: imagePreview });
      if (result.ingredients && result.ingredients.length > 0) {
        setIdentifiedIngredients(result.ingredients);
        toast({ title: "Ingredients Identified!", description: "Ready to generate a recipe?" });
      } else {
        setError("Could not identify any ingredients. Try a different image or angle.");
        toast({ title: "No Ingredients Found", variant: "destructive" });
      }
    } catch (err) {
      console.error("Error identifying ingredients:", err);
      setError("An error occurred while identifying ingredients. Please try again.");
      toast({ title: "Identification Error", description: "Failed to identify ingredients.", variant: "destructive" });
    } finally {
      setIsLoadingIngredients(false);
    }
  };

  const handleGenerateRecipe = async () => {
    if (!identifiedIngredients || identifiedIngredients.length === 0) {
      setError("No ingredients identified to generate a recipe.");
      return;
    }

    setError(null);
    setIsLoadingRecipe(true);
    setGeneratedRecipe(null);

    try {
      // For now, no cuisine selection, can be added later
      const recipeData: GenerateRecipeOutput = await generateRecipe({ ingredients: identifiedIngredients });
      const newRecipe: Recipe = {
        id: recipeData.title.toLowerCase().replace(/\s+/g, '-'), // Simple ID generation
        title: recipeData.title,
        description: recipeData.description,
        ingredients: recipeData.ingredients,
        instructions: recipeData.instructions,
        prepTime: recipeData.prepTime,
        cookTime: recipeData.cookTime,
        servings: recipeData.servings,
        // Assuming AI might provide an image URL, or we use a placeholder
        imageUrl: `https://placehold.co/800x400.png?text=${encodeURIComponent(recipeData.title)}`,
      };
      setGeneratedRecipe(newRecipe);
      toast({ title: "Recipe Generated!", description: `Enjoy your ${recipeData.title}!` });
    } catch (err) {
      console.error("Error generating recipe:", err);
      setError("An error occurred while generating the recipe. Please try again.");
      toast({ title: "Recipe Generation Error", description: "Failed to generate recipe.", variant: "destructive" });
    } finally {
      setIsLoadingRecipe(false);
    }
  };

  return (
    <div className="space-y-8">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-2xl flex items-center gap-2"><UploadCloud className="text-primary"/>Upload Your Ingredients Photo</CardTitle>
          <CardDescription>Snap a picture of your ingredients, and let our AI whip up a recipe for you!</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmitIngredients} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="image-upload" className="text-lg">Choose an image</Label>
              <Input
                id="image-upload"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                ref={fileInputRef}
                className="file:text-primary file:font-semibold file:bg-primary-foreground hover:file:bg-accent"
              />
            </div>

            {imagePreview && (
              <div className="mt-4 border rounded-lg overflow-hidden shadow-sm aspect-video max-h-[400px] flex justify-center items-center bg-muted">
                <Image src={imagePreview} alt="Selected ingredients" width={600} height={400} className="object-contain max-h-full max-w-full" data-ai-hint="food ingredients" />
              </div>
            )}
            
            <Button type="submit" disabled={!imageFile || isLoadingIngredients} className="w-full md:w-auto">
              {isLoadingIngredients ? <LoadingSpinner size={20} /> : <Sparkles className="mr-2 h-4 w-4" />}
              Identify Ingredients
            </Button>
          </form>
        </CardContent>
      </Card>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {identifiedIngredients && !generatedRecipe && (
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline text-2xl flex items-center gap-2"><List className="text-primary"/>Identified Ingredients</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-1 text-lg columns-1 sm:columns-2 md:columns-3">
              {identifiedIngredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button onClick={handleGenerateRecipe} disabled={isLoadingRecipe} className="w-full md:w-auto">
              {isLoadingRecipe ? <LoadingSpinner size={20} /> : <ChefHat className="mr-2 h-4 w-4" />}
              Generate Recipe
            </Button>
          </CardFooter>
        </Card>
      )}
      
      {isLoadingRecipe && !generatedRecipe && (
        <div className="text-center py-8">
          <LoadingSpinner size={48} />
          <p className="mt-4 text-lg font-semibold text-primary">Generating your delicious recipe...</p>
        </div>
      )}

      {generatedRecipe && (
        <RecipeDisplay recipe={generatedRecipe} />
      )}
    </div>
  );
}
