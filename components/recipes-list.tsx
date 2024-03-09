"use client";

import { RecipeCard } from "@/components/recipe-card";
import { Pagination } from "@nextui-org/react";
import styles from "./recipes-list.module.css";
import { PlusIcon } from "@/components/icons";
import { Link, useRouter } from "@/navigation";
import { useSearchParams } from "next/navigation";
import { RecipeHeader } from "@/types/recipe";
import { FC } from "react";

export interface RecipesListProps {
  recipes: Array<RecipeHeader>;
  total: number;
}

const RecipesList: FC<RecipesListProps> = (props) => {
  const { recipes, total } = props;
  const q = useSearchParams();
  const page = parseInt(q.get("page") || "1");
  const router = useRouter();
  const totalPages = Math.ceil(total / perPage);

  const handleChangePage = async (page: number) => {
    router.push(`/recipes?page=${page}`);
  };

  return (
    <section className="flex flex-col items-center">
      <div className={styles.recipes + " flex flex-wrap items-center gap-3 overflow-y-scroll"}>
        {recipes.map((recipe) => (
          <div className="flex gap-3" key={recipe.id}>
            <RecipeCard recipe={recipe} />
          </div>
        ))}
      </div>

      <div className="pt-3 flex gap-8 items-center">
        <Pagination isCompact onChange={handleChangePage} page={page} total={totalPages} variant="bordered" />
        <Link href="/recipes/new">
          <PlusIcon />
        </Link>
      </div>
    </section>
  );
};

export default RecipesList;
