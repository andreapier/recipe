import { Recipe } from "@/lib/types/recipe";
import { connectToDb } from "../db/connect-to-db";
import { RecipeModel } from "../db/recipe-schema";

export const getRecipe = async (slug: string) => {
  "use server";

  try {
    connectToDb();
    return (await RecipeModel.findOne({ slug }).lean()) as Recipe;
  } catch (e) {
    console.error(e);
    throw new Error(`Failed to fetch recipe '${slug}'`);
  }
};
