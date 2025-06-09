
'use server';
/**
 * @fileOverview A flow for generating an image for a recipe.
 *
 * - generateRecipeImage - A function that handles the recipe image generation.
 * - GenerateRecipeImageInput - The input type for the generateRecipeImage function.
 * - GenerateRecipeImageOutput - The return type for the generateRecipeImage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateRecipeImageInputSchema = z.object({
  recipeTitle: z.string().describe('The title of the recipe for which to generate an image.'),
  recipeDescription: z.string().optional().describe('A short description of the recipe to help guide image generation.'),
});
export type GenerateRecipeImageInput = z.infer<typeof GenerateRecipeImageInputSchema>;

const GenerateRecipeImageOutputSchema = z.object({
  imageUrl: z.string().describe("The data URI of the generated image. Expected format: 'data:image/png;base64,<encoded_data>'."),
});
export type GenerateRecipeImageOutput = z.infer<typeof GenerateRecipeImageOutputSchema>;

export async function generateRecipeImage(input: GenerateRecipeImageInput): Promise<GenerateRecipeImageOutput> {
  return generateRecipeImageFlow(input);
}

const generateRecipeImageFlow = ai.defineFlow(
  {
    name: 'generateRecipeImageFlow',
    inputSchema: GenerateRecipeImageInputSchema,
    outputSchema: GenerateRecipeImageOutputSchema,
  },
  async (input) => {
    const prompt = `Generate a vibrant, appetizing, and photorealistic image suitable for a recipe blog for a dish called "${input.recipeTitle}". ${input.recipeDescription ? `Description: ${input.recipeDescription}` : ''}. The image should be well-lit and visually appealing. Focus on the food itself.`;

    const {media} = await ai.generate({
      model: 'googleai/gemini-2.0-flash-exp', // Ensure this model supports image generation
      prompt: prompt,
      config: {
        responseModalities: ['TEXT', 'IMAGE'], // Must include IMAGE
      },
    });

    if (!media?.url) {
      throw new Error('Image generation failed or did not return an image URL.');
    }
    
    return { imageUrl: media.url }; // media.url is the data URI
  }
);
