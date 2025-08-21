import Card from "@/components/card";
import MainWrapper from "@/components/main-wrapper";
import { fetchAllRecipes } from "@/lib/data/recipe";
import { Recipe, RecipeResponse } from "@/lib/interfaces";
import { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
//import data from "@/lib/recipes.json";

export const metadata: Metadata = {
  title: "Our Recipes",
  description: "A collection of delicious recipes",
};




async function RecipeList() {
  const recipes: Recipe[] = await fetchAllRecipes();
  return (
    <ul className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(30ch,1fr))] content-stretch">
      {recipes.map((recipe, i) => (
        <li key={i}>
          <Link href={`/pages/recipes/${recipe.id}`}>
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

// async function RecipeList({ recipes }: { recipes: Promise<Recipe[]> }) {
//   const awaitedRecipes: Recipe[] = await recipes;
//   return (
//     <ul className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(30ch,1fr))] content-stretch">
//       {awaitedRecipes.map((recipe, i) => (
//         <li key={i}>
//           <Link href={`/recipes/${recipe.id}`}>
//             <Card
//               recipe={recipe}
//               className="border border-neutral-300 rounded p-4 shadow-sm"
//             />
//           </Link>
//         </li>
//       ))}
//     </ul>
//   );
// }

export default async function Recipes() {
  const recipes: Promise<Recipe[]> = fetchAllRecipes();
  return (
    <MainWrapper title="Recipes">
      {/* https://nextjs.org/docs/app/getting-started/fetching-data#with-suspense */}
      <Suspense fallback={<p>Loading recipes...</p>}>
        <RecipeList />
      </Suspense>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque dicta
        culpa veniam iusto voluptate laboriosam itaque, ullam, exercitationem
        magni sed quidem nihil aliquam fuga. Voluptatem exercitationem
        consectetur laboriosam neque est?
      </p>
    </MainWrapper>
  );
}
