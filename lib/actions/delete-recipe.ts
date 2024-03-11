import { notFound } from "next/navigation";
import { revalidatePath } from "next/cache";
import { connectToDb } from "../db/connect-to-db";
import { RecipeModel } from "../db/recipe-schema";

export async function deleteRecipe(id: string) {
  "use server";

  try {
    connectToDb();
    const res = await RecipeModel.findByIdAndDelete(id);
    if (!res) {
      return notFound();
    }

    revalidatePath("/recipes");
  } catch (e) {
    console.error(e);
    throw new Error(`Failed to delete recipe by id: ${id}`);
  }
}
