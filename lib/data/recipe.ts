import { Recipe, RecipeResponse } from "../interfaces";

export async function fetchAllRecipes() {
  const response = await fetch("https://dummyjson.com/recipes");
  const { recipes }: RecipeResponse = await response.json();

  return recipes;
}

export async function fetchRecipeById(id: string) {
  const response = await fetch(`https://dummyjson.com/recipes/${id}`);
  const recipe: Recipe = await response.json();
  return recipe;
}

export async function getRecipesByTag(tag: string) {
  const response = await fetch(
    `https://dummyjson.com/recipes/tag/${tag}`
  );
  const { recipes }: RecipeResponse = await response.json();
  return recipes;
}

export async function getRecipesBySearchTerm(searchTerm: string) {
  const response = await fetch(
    `https://dummyjson.com/recipes/search?q=${searchTerm}`
  );
  const { recipes }: RecipeResponse = await response.json();
  return recipes;
}
