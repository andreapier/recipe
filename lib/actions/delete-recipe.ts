import { notFound } from "next/navigation";
import { getRecipes } from "../data";
import { revalidatePath } from "next/cache";

export async function deleteRecipe(recipeId: string) {
  "use server";

  const recipes = await getRecipes();
  const index = recipes.findIndex((x) => x.id === recipeId);

  if (index < 0) {
    return notFound();
  }

  recipes.splice(index, 1);
  revalidatePath("/recipes");
}
