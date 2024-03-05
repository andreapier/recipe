import { RecipeCard } from "@/components/recipe-card";
import { getRecipes } from "@/lib/data";

const RecipesPage = async () => {
  const recipes = await getRecipes();

  return (
    <section className="flex items-center justify-center gap-4 py-8 md:py-10">
      {recipes.map((recipe) => (
        <div className="flex gap-3" key={recipe.id}>
          <RecipeCard recipe={recipe} />
        </div>
      ))}
    </section>
  );
};

export default RecipesPage;
