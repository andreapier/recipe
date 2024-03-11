"use client";

import { EditIcon, RestoreIcon, SaveIcon, TrashIcon } from "@/components/icons";
import { Recipe, RecipeItemsGroup } from "@/lib/types/recipe";
import { Button, ButtonGroup, Image, Input } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import { FC, useState } from "react";
import { AddRemoveInput } from "./add-remove-input";
import { cloneDeep } from "lodash";
import { useRouter } from "@/lib/intl/navigation";
import { ConfirmPopover } from "./confirm-popover";

export interface RecipeFormProps {
  recipe: Recipe;
  initialRecipe: Recipe;
  isEdit?: boolean;
  onDelete?: (id: string) => Promise<void>;
  onSave: (recipe: Recipe) => Promise<void>;
}

export const RecipeForm: FC<RecipeFormProps> = (props) => {
  const t = useTranslations("recipeForm");
  const router = useRouter();
  const { isEdit: initialIsEdit } = props;

  const [isEdit, setIsEdit] = useState(initialIsEdit);
  const [recipe, setRecipe] = useState(props.recipe);

  const handleRemove = async () => {
    if (props.onDelete) {
      await props.onDelete(recipe._id.toString());
      router.push("/recipes");
    }
  };
  const handleRestore = () => {
    if (initialIsEdit) {
      router.push("/recipes");
    } else {
      setIsEdit(false);
      setRecipe(props.initialRecipe);
    }
  };
  const handleSave = async () => {
    await props.onSave(recipe);
    setIsEdit(false);
  };
  const handleSetEdit = (event: MouseEvent) => {
    event.preventDefault();
    setIsEdit(!isEdit);
  };

  const handleChangeName = (name: string) => {
    const newRecipe = cloneDeep(recipe);
    newRecipe.name = name;
    setRecipe(newRecipe);
  };
  const handleChangePeople = (people: string) => {
    const newRecipe = cloneDeep(recipe);
    newRecipe.people = parseInt(people);
    setRecipe(newRecipe);
  };

  const handleChangeGroupName = (newName: string, group: Array<RecipeItemsGroup>, groupIndex: number) => {
    group[groupIndex].name = newName;
    const newRecipe = cloneDeep(recipe);

    setRecipe(newRecipe);
  };
  const handleGroupAdd = (group: Array<RecipeItemsGroup>, groupIndex: number) => {
    const newGroup = {
      name: "",
      items: [""],
    };
    group.splice(groupIndex + 1, 0, newGroup);
    const newRecipe = cloneDeep(recipe);
    setRecipe(newRecipe);
  };

  const handleChangeGroupItem = (newItem: string, items: Array<string>, ingredientIndex: number) => {
    items.splice(ingredientIndex, 1, newItem);
    const newRecipe = cloneDeep(recipe);
    setRecipe(newRecipe);
  };
  const handleAddGroupItem = (items: Array<string>, ingredientIndex: number) => {
    items.splice(ingredientIndex + 1, 0, "");
    const newRecipe = cloneDeep(recipe);
    setRecipe(newRecipe);
  };
  const handleRemoveGroupItem = (group: Array<RecipeItemsGroup>, groupIndex: number, ingredientIndex: number) => {
    group[groupIndex].items.splice(ingredientIndex, 1);
    if (group[groupIndex].items.length === 0) {
      group.splice(groupIndex, 1);
    }
    const newRecipe = cloneDeep(recipe);
    setRecipe(newRecipe);
  };

  const renderGroups = (groups: Array<RecipeItemsGroup>, titleKey: "ingredients" | "preparation") => {
    return (
      <>
        <h2 className="text-3xl pt-4 pb-3">{t(titleKey)}</h2>
        <ul>
          {groups.map((group, groupIndex) => (
            <li className="py-2 leading-relaxed indent-2" key={`${titleKey}_${groupIndex}`}>
              {isEdit ? (
                <AddRemoveInput
                  removeHidden
                  value={group.name}
                  onValueChange={(newName) => handleChangeGroupName(newName, groups, groupIndex)}
                  onAdd={() => handleGroupAdd(groups, groupIndex)}
                  size="sm"
                />
              ) : (
                <h3 className="text-lg font-semibold">{group.name}</h3>
              )}
              <ol className="list-decimal list-inside">
                {group.items.map((item, itemIndex) =>
                  isEdit ? (
                    <AddRemoveInput
                      className="pt-1 pl-4"
                      key={`ingredients_${groupIndex}_${itemIndex}`}
                      removeDisabled={groupIndex === 0 && group.items.length === 1}
                      value={item}
                      onValueChange={(newIngredient) => handleChangeGroupItem(newIngredient, group.items, itemIndex)}
                      onAdd={() => handleAddGroupItem(group.items, itemIndex)}
                      onRemove={() => handleRemoveGroupItem(groups, groupIndex, itemIndex)}
                      size="sm"
                    />
                  ) : (
                    <li className="indent-4" key={`${titleKey}_${groupIndex}_${itemIndex}`}>
                      {item}
                    </li>
                  ),
                )}
              </ol>
            </li>
          ))}
        </ul>
      </>
    );
  };

  return (
    <form action={handleSave}>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="w-6/12 flex grow justify-between items-center gap-2">
          {isEdit ? <Input className="pt-1" value={recipe.name} onValueChange={handleChangeName} /> : <h1 className="text-5xl font-bold">{recipe.name}</h1>}
          {isEdit ? (
            <ButtonGroup>
              <Button isIconOnly variant="light" aria-label="save" type="submit">
                <SaveIcon />
              </Button>
              <ConfirmPopover
                confirmIcon={<RestoreIcon />}
                onConfirm={handleRestore}
                trigger={
                  <Button aria-label="restore" color="warning" isIconOnly variant="light">
                    <RestoreIcon />
                  </Button>
                }
              ></ConfirmPopover>
            </ButtonGroup>
          ) : (
            <ButtonGroup>
              <Button isIconOnly aria-label="edit" variant="light" onClick={(e) => handleSetEdit(e.nativeEvent)}>
                <EditIcon />
              </Button>
              <ConfirmPopover
                confirmIcon={<TrashIcon />}
                onConfirm={handleRemove}
                trigger={
                  <Button aria-label="delete" isDisabled={!props.onDelete} isIconOnly color="warning" variant="light">
                    <TrashIcon />
                  </Button>
                }
              ></ConfirmPopover>
            </ButtonGroup>
          )}
        </div>

        <Image src={recipe.img} alt={recipe.name} />

        <div className="justify-start w-full">
          <div className="flex items-center gap-4">
            <p className="text-small">{t("suggestedPeople", { people: recipe.people.toString() })}</p>
            {isEdit && <Input className="w-14" min={1} size="sm" type="number" value={recipe.people.toString()} onValueChange={handleChangePeople} />}
          </div>

          {renderGroups(recipe.ingredients, "ingredients")}
          {renderGroups(recipe.steps, "preparation")}
        </div>
      </section>
    </form>
  );
};
