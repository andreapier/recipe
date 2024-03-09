import { notFound } from "next/navigation";
import { getRecipes } from "../data";
import { revalidatePath } from "next/cache";
import { Recipe } from "@/types/recipe";

export async function saveRecipe(recipe: Recipe) {
  "use server";

  const recipes = await getRecipes();
  const index = recipes.findIndex((x) => x.id === recipe.id);

  if (index < 0) {
    return notFound();
  }

  recipes.splice(index, 1, recipe);
  revalidatePath("/recipes");
  revalidatePath(`/recipes/${recipe.slug}`);
}
