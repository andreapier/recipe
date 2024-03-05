import { getRecipe } from "@/lib/data";
import { Image } from "@nextui-org/react";
import { getTranslations } from "next-intl/server";
import { FC } from "react";

export interface RecipePageProps {
  params: { name: string };
}

const SingleRecipePage: FC<RecipePageProps> = async ({ params }) => {
  const { name: slug } = params;
  const t = await getTranslations("recipePage");

  const recipe = await getRecipe(slug);
  if (!recipe) {
    throw new Error("Not found");
  }

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <h1 className="text-5xl font-bold">{recipe.name}</h1>
      <Image src={recipe.img} alt={recipe.name} />
      <div className="justify-start">
        <h2 className="text-3xl pt-4 pb-3">{t("ingredients")}</h2>
        <ul>
          {recipe.ingredients.map((group, groupIndex) => (
            <li className="py-2 leading-relaxed indent-2" key={`ingredients_${groupIndex}`}>
              <h3 className="text-lg font-semibold">{group.group}</h3>
              <ul className="list-disc list-inside">
                {group.ingredients.map((ingredient, ingredientIndex) => (
                  <li className="indent-4" key={`ingredients_${groupIndex}_${ingredientIndex}`}>
                    {ingredient}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>

        <h2 className="text-3xl pt-4 pb-3">{t("preparation")}</h2>
        <ul>
          {recipe.steps.map((group, groupIndex) => (
            <li className="py-2 leading-relaxed indent-2" key={`steps_${groupIndex}`}>
              <h3 className="text-lg font-semibold">{group.group}</h3>
              <ol className="list-decimal list-inside">
                {group.steps.map((step, stepIndex) => (
                  <li className="indent-4" key={`ingredients_${groupIndex}_${stepIndex}`}>
                    {step}
                  </li>
                ))}
              </ol>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default SingleRecipePage;
