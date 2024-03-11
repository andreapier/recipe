import { RecipesList } from "@/components/recipes-list";
import { getRecipes } from "@/lib/actions/get-recipes";

const RecipesPage = async ({ searchParams }: { params: { slug: string }; searchParams: { [key: string]: string | undefined } }) => {
  const pageParam = searchParams?.page;
  const perPageParam = searchParams?.perPage;
  const page = (pageParam && parseInt(pageParam)) || undefined;
  const perPage = (perPageParam && parseInt(perPageParam)) || undefined;
  const recipes = await getRecipes(page, perPage);
  console.log(recipes.items);

  return <RecipesList recipes={recipes.items} total={recipes.total} />;
};

export default RecipesPage;
