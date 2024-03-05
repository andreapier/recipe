import { FC } from "react";
import { Card, CardHeader, CardBody, CardFooter, Image } from "@nextui-org/react";
import { Recipe } from "@/types/recipe";
import { useFormatter, useTranslations } from "next-intl";
import { Link } from "@/navigation";

export interface RecipeCardProps {
  recipe: Recipe;
}

export const RecipeCard: FC<RecipeCardProps> = ({ recipe }) => {
  const format = useFormatter();
  const t = useTranslations("recipesPage");
  const createdAt = format.dateTime(recipe.createdAt, {
    dateStyle: "short",
    timeStyle: "short",
  });

  return (
    <Card className="py-4 h-[300px] w-[300px]">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <h4 className="font-bold text-large">{recipe.name}</h4>
        <p className="text-tiny uppercase font-bold">{recipe.description}</p>
        <small className="text-default-500">{createdAt}</small>
      </CardHeader>
      <CardBody className="overflow-visible py-2 flex-row justify-center">
        <Image alt={recipe.name} className="object-cover rounded-xl m-auto" src={recipe.img} width={200} />
      </CardBody>
      <CardFooter>
        <Link href={`/recipes/${recipe.slug}`} className="text-tiny font-bold">
          {t("goToRecipe")}
        </Link>
      </CardFooter>
    </Card>
  );
};
