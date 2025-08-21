import { getRecipesBySearchTerm, getRecipesByTag } from "@/lib/data/recipe";
import MainWrapper from "@/components/main-wrapper";
import Card from "@/components/card";
import Link from "next/link";
import { Recipe } from "@/lib/interfaces";

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ query?: string }> }) {
  const params = await searchParams;
  const query = params.query || "";
  let recipes: Recipe[] = [];
  if (query) {
    // Fetch recipes by search term and by tag
    const [searchResults, tagResults] = await Promise.all([
      getRecipesBySearchTerm(query),
      getRecipesByTag(query)
    ]);
    // Combine and deduplicate by id
    const allRecipes = [...searchResults, ...tagResults];
    const seen = new Set();
    recipes = allRecipes.filter(recipe => {
      if (seen.has(recipe.id)) return false;
      seen.add(recipe.id);
      return true;
    });
  }
  return (
      <MainWrapper title={query ? `Search results for "${query}"` : "Search recipes"}>
    {/* Inputform */}
      <form action="/pages/search" method="get" className="mb-6 flex gap-2">
        <input
          type="text"
          name="query"
          defaultValue={query}
          placeholder="Search recipes..."
          className="border px-2 py-1 rounded w-full"
        />
        <button type="submit" className="px-4 py-1 bg-blue-600 text-white rounded">Search</button>
          </form>
          
      {query && (
        <ul className={
          recipes.length === 1
            ? "grid grid-cols-1 max-w-md mx-auto"
            : "grid gap-4 grid-cols-[repeat(auto-fit,minmax(30ch,1fr))] content-stretch"
        }>
          {recipes.length > 0 ? (
            recipes.map((recipe: Recipe) => (
                <li key={recipe.id}>
                    <Link href={`/pages/recipes/${recipe.id}`}>
                      <Card recipe={recipe} className="border border-neutral-300 shadow-sm" />
                    </Link>
                </li>
            ))
          ) : (
            <li>No recipes found.</li>
          )}
        </ul>
      )}
    </MainWrapper>
  );
}


