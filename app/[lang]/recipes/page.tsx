import { getRecipes } from "@/lib/data";
import RecipesList from "@/components/recipes-list";

const RecipesPage = async ({ searchParams }: { params: { slug: string }; searchParams: { [key: string]: string | undefined } }) => {
  const pageParam = searchParams?.page;
  const perPageParam = searchParams?.perPage;

  let page = (pageParam && parseInt(pageParam)) || undefined;
  let perPage = (perPageParam && parseInt(perPageParam)) || undefined;
  let recipes = await getRecipes(page, perPage);

  console.log("Page", page, "Got recipes", recipes.items);

  return <RecipesList recipes={recipes.items} total={recipes.total} />;
};

export default RecipesPage;
