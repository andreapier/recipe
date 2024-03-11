import { Recipe } from "@/lib/types/recipe";
import { connectToDb } from "../db/connect-to-db";
import { RecipeModel } from "../db/recipe-schema";

export const getRecipes = async (page: number = 1, perPage: number = 8) => {
  "use server";

  if (perPage > 100) {
    perPage = 100;
  }

  try {
    connectToDb();
    const total = await RecipeModel.countDocuments();
    const query = RecipeModel.find()
      .select("_id name slug description img createdAt people tags")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .lean();
    const items = (await query.exec()) as Array<Recipe>;

    return {
      total,
      items,
    };
  } catch (e) {
    console.error(e);
    throw new Error(`Failed to fetch recipes: page: ${page}, perPage: ${perPage}`);
  }
};
