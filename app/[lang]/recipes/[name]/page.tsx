import { RecipeForm } from "@/components/recipe-form";
import { deleteRecipe } from "@/lib/actions/delete-recipe";
import { saveRecipe } from "@/lib/actions/save-recipe";
import { getRecipe } from "@/lib/data";
import { FC } from "react";

export interface RecipePageProps {
  params: { name: string };
}

const SingleRecipePage: FC<RecipePageProps> = async ({ params }) => {
  const { name: slug } = params;

  const recipe = await getRecipe(slug);
  if (!recipe) {
    throw new Error("Not found");
  }

  return <RecipeForm recipe={recipe} initialRecipe={recipe} onDelete={deleteRecipe} onSave={saveRecipe} />;
};

export default SingleRecipePage;
