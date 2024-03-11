import { FC } from "react";
import { Card, CardHeader, CardBody, Image, Divider } from "@nextui-org/react";
import { RecipeHeader } from "@/lib/types/recipe";
import { useFormatter } from "next-intl";
import { Link } from "@/navigation";
import { PersonIcon } from "./icons";

export interface RecipeCardProps {
  recipe: RecipeHeader;
}

export const RecipeCard: FC<RecipeCardProps> = ({ recipe }) => {
  const format = useFormatter();

  const createdAt = format.dateTime(recipe.createdAt, {
    dateStyle: "short",
    timeStyle: "short",
  });

  return (
    <Link href={`/recipes/${recipe.slug}`} className="text-tiny font-bold">
      <Card className="py-1 w-[300px]">
        <CardHeader className="pt-1 px-4 flex-col items-start">
          <h4 className="font-bold text-large">{recipe.name}</h4>
          <p className="text-tiny uppercase font-bold line-clamp-3 h-[48px]">{recipe.description}</p>
          <div className="flex justify-between w-full items-center">
            <div className="grow">
              <small className="text-default-500">{createdAt}</small>
            </div>
            <div className="flex items-center">
              <PersonIcon size={16} />
              <small className="text-default-500"> x {recipe.people}</small>
            </div>
          </div>
        </CardHeader>
        <Divider />
        <CardBody className="py-2 flex-row justify-center h-[165px]">
          <Image alt={recipe.name} className="object-cover rounded-xl" isZoomed loading="lazy" src={recipe.img} height={112} />
        </CardBody>
      </Card>
    </Link>
  );
};
