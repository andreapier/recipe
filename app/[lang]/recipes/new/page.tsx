import { RecipeForm } from "@/components/recipe-form";
import { saveRecipe } from "@/lib/actions/save-recipe";
import { RecipeItemsGroup, Recipe, StepsGroup } from "@/lib/types/recipe";
import { FC } from "react";

const NewRecipePage: FC = async () => {
  const recipe = new Recipe();

  //Clone all object to avoid
  //error "Only plain objects, and a few built-ins, can be passed to Client Components from Server Components"
  recipe.ingredients.push({ ...new IngredientsGroup() });
  recipe.ingredients[0].ingredients.push("");
  recipe.steps.push({ ...new StepsGroup() });
  recipe.steps[0].steps.push("");
  const recipeProp = { ...recipe };
  console.log(recipeProp);

  return <RecipeForm isEdit recipe={recipeProp} initialRecipe={recipeProp} onSave={saveRecipe} />;
};

export default NewRecipePage;
