import { notFound } from "next/navigation";
import { revalidatePath } from "next/cache";
import { Recipe } from "@/lib/types/recipe";
import { connectToDb } from "../db/connect-to-db";
import { RecipeModel } from "../db/recipe-schema";

export async function saveRecipe(recipe: Recipe) {
  "use server";

  try {
    connectToDb();
    const res = await RecipeModel.replaceOne(recipe);
    if (!res) {
      return notFound();
    }

    revalidatePath("/recipes");
    revalidatePath(`/recipes/${recipe.slug}`);
  } catch (e) {
    console.error(e);
    throw new Error(`Failed to replace recipe: ${recipe}`);
  }
}
