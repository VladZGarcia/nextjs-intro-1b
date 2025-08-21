import { getRecipesBySearchTerm, getRecipesByTag } from "@/lib/data/recipe";
import { Recipe } from "@/lib/interfaces";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
    const searchTerm = searchParams.get("search");
    let recipes: Recipe[] = [];
  try {
    if (searchTerm) {
        
      const seen = new Set();
      const searchResults = await getRecipesBySearchTerm(searchTerm);
      const tagResults = await getRecipesByTag(searchTerm);
      let allRecipes = [...searchResults, ...tagResults];
      recipes = allRecipes.filter(recipe => {
        if (seen.has(recipe.id)) return false;
        seen.add(recipe.id);
        return true;
      });
      return recipes;
    }
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return new Response("Failed to fetch recipes", { status: 500 });
  }
}
