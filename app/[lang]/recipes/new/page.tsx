import { RecipeForm } from "@/components/recipe-form";
import { saveRecipe } from "@/lib/actions/save-recipe";
import { RecipeItemsGroup, Recipe } from "@/lib/types/recipe";
import { FC } from "react";

const NewRecipePage: FC = async () => {
  const recipe = {
    _id: "",
    name: "",
    description: "",
    slug: "",
    people: 4,
    createdAt: new Date(),
    ingredients: [{ name: "", items: [""] }],
    steps: [{ name: "", items: [""] }],
    tags: [],
  };

  const recipeProp = { ...recipe };

  return <RecipeForm isEdit recipe={recipeProp} initialRecipe={recipeProp} onSave={saveRecipe} />;
};

export default NewRecipePage;
