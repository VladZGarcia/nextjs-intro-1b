import Card from "@/components/card";
import MainWrapper from "@/components/main-wrapper";
import { getRecipesByTag } from "@/lib/data/recipe";
import { Recipe, RecipeResponse } from "@/lib/interfaces";
import Link from "next/link";
import { Suspense } from "react";


 async function RecipesByTag({
    params,
}: {
    params: Promise<{ tag: string }>;
    }) {
    const { tag } = await params;
    const recipes: Recipe[] = await getRecipesByTag(tag);
    // Filter recipes to only those that have the exact tag
    /* const filteredRecipes = recipes.filter(recipe => recipe.tags.includes(tag)); */
    return (
      <ul className={
        recipes.length === 1
          ? "grid grid-cols-1 max-w-md mx-auto"
          : "grid gap-4 grid-cols-[repeat(auto-fit,minmax(30ch,1fr))] content-stretch"
      }>
        {recipes.map((recipe, i) => (
          <li key={i}>
            <Link href={`/recipes/${recipe.id}`}>
              <Card
                recipe={recipe}
                className="border border-neutral-300 shadow-sm"
              />
            </Link>
          </li>
        ))}
      </ul>
    );
}

export default async function RecipesByTagPage({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  return (
      <MainWrapper title={`"${(await params).tag}"`}>
        {/* https://nextjs.org/docs/app/getting-started/fetching-data#with-suspense */}
        <Suspense fallback={<p>Loading recipes...</p>}>
          <RecipesByTag params={params} />
        </Suspense>
      </MainWrapper>
    );
}