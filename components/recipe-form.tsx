"use client";

import { EditIcon, RestoreIcon, SaveIcon, TrashIcon } from "@/components/icons";
import { IngredientsGroup, Recipe, StepsGroup } from "@/types/recipe";
import { Button, ButtonGroup, Image, Input } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import { FC, useState } from "react";
import { AddRemoveInput } from "./add-remove-input";
import { cloneDeep } from "lodash";
import { useRouter } from "@/navigation";
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
      await props.onDelete(recipe.id);
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
  const handlePeopleChange = (people: string) => {
    const newRecipe = cloneDeep(recipe);
    newRecipe.people = parseInt(people);
    setRecipe(newRecipe);
  };
  const handleChangeIngredientGroupName = (newName: string, groupIndex: number) => {
    const newRecipe = cloneDeep(recipe);
    newRecipe.ingredients[groupIndex].name = newName;
    setRecipe(newRecipe);
  };
  const handleIngredientGroupAdd = (groupIndex: number) => {
    const newRecipe = cloneDeep(recipe);
    var group = new IngredientsGroup();
    group.ingredients.push("");
    newRecipe.ingredients.splice(groupIndex + 1, 0, group);
    setRecipe(newRecipe);
  };
  const handleChangeIngredient = (newIngredient: string, groupIndex: number, ingredientIndex: number) => {
    const newRecipe = cloneDeep(recipe);
    newRecipe.ingredients[groupIndex].ingredients.splice(ingredientIndex, 1, newIngredient);
    setRecipe(newRecipe);
  };
  const handleAddIngredient = (groupIndex: number, ingredientIndex: number) => {
    const newRecipe = cloneDeep(recipe);
    newRecipe.ingredients[groupIndex].ingredients.splice(ingredientIndex + 1, 0, "");
    setRecipe(newRecipe);
  };
  const handleRemoveIngredient = (groupIndex: number, ingredientIndex: number) => {
    const newRecipe = cloneDeep(recipe);
    newRecipe.ingredients[groupIndex].ingredients.splice(ingredientIndex, 1);
    if (newRecipe.ingredients[groupIndex].ingredients.length === 0) {
      newRecipe.ingredients.splice(groupIndex, 1);
    }
    setRecipe(newRecipe);
  };

  const handleChangeStepGroupName = (newName: string, groupIndex: number) => {
    const newRecipe = cloneDeep(recipe);
    newRecipe.steps[groupIndex].name = newName;
    setRecipe(newRecipe);
  };
  const handleStepGroupAdd = (groupIndex: number) => {
    const newRecipe = cloneDeep(recipe);
    var group = new StepsGroup();
    group.steps.push("");
    newRecipe.steps.splice(groupIndex + 1, 0, group);
    setRecipe(newRecipe);
  };
  const handleChangeStep = (newStep: string, groupIndex: number, ingredientIndex: number) => {
    const newRecipe = cloneDeep(recipe);
    newRecipe.steps[groupIndex].steps.splice(ingredientIndex, 1, newStep);
    setRecipe(newRecipe);
  };
  const handleAddStep = (groupIndex: number, ingredientIndex: number) => {
    const newRecipe = cloneDeep(recipe);
    newRecipe.steps[groupIndex].steps.splice(ingredientIndex + 1, 0, "");
    setRecipe(newRecipe);
  };
  const handleRemoveStep = (groupIndex: number, ingredientIndex: number) => {
    const newRecipe = cloneDeep(recipe);
    newRecipe.steps[groupIndex].steps.splice(ingredientIndex, 1);
    if (newRecipe.steps[groupIndex].steps.length === 0) {
      newRecipe.steps.splice(groupIndex, 1);
    }
    setRecipe(newRecipe);
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
            <p className="text-small">{t("suggestedPeople", { people: recipe.people })}</p>
            {isEdit && <Input className="w-14" min={1} size="sm" type="number" value={recipe.people.toString()} onValueChange={handlePeopleChange} />}
          </div>

          <h2 className="text-3xl pt-4 pb-3">{t("ingredients")}</h2>

          <ul>
            {recipe.ingredients.map((group, groupIndex) => (
              <li className="py-2 leading-relaxed indent-2" key={`ingredients_${groupIndex}`}>
                {isEdit ? (
                  <AddRemoveInput
                    removeHidden
                    value={group.name}
                    onValueChange={(newName) => handleChangeIngredientGroupName(newName, groupIndex)}
                    onAdd={() => handleIngredientGroupAdd(groupIndex)}
                    size="sm"
                  />
                ) : (
                  <h3 className="text-lg font-semibold">{group.name}</h3>
                )}
                <ul className="list-disc list-inside">
                  {group.ingredients.map((ingredient, ingredientIndex) =>
                    isEdit ? (
                      <AddRemoveInput
                        className="pt-1 pl-4"
                        key={`ingredients_${groupIndex}_${ingredientIndex}`}
                        removeDisabled={groupIndex === 0 && group.ingredients.length === 1}
                        value={ingredient}
                        onValueChange={(newIngredient) => handleChangeIngredient(newIngredient, groupIndex, ingredientIndex)}
                        onAdd={() => handleAddIngredient(groupIndex, ingredientIndex)}
                        onRemove={() => handleRemoveIngredient(groupIndex, ingredientIndex)}
                        size="sm"
                      />
                    ) : (
                      <li className="indent-4" key={`ingredients_${groupIndex}_${ingredientIndex}`}>
                        {ingredient}
                      </li>
                    ),
                  )}
                </ul>
              </li>
            ))}
          </ul>

          <h2 className="text-3xl pt-4 pb-3">{t("preparation")}</h2>
          <ul>
            {recipe.steps.map((group, groupIndex) => (
              <li className="py-2 leading-relaxed indent-2" key={`steps_${groupIndex}`}>
                {isEdit ? (
                  <AddRemoveInput
                    removeHidden
                    value={group.name}
                    onValueChange={(newName) => handleChangeStepGroupName(newName, groupIndex)}
                    onAdd={() => handleStepGroupAdd(groupIndex)}
                    size="sm"
                  />
                ) : (
                  <h3 className="text-lg font-semibold">{group.name}</h3>
                )}
                <ol className="list-decimal list-inside">
                  {group.steps.map((step, stepIndex) => (
                    <li className="indent-4" key={`steps_${groupIndex}_${stepIndex}`}>
                      {isEdit ? (
                        <AddRemoveInput
                          className="pt-1 w-11/12 inline-block"
                          key={`steps_${groupIndex}_${stepIndex}`}
                          removeDisabled={groupIndex === 0 && group.steps.length === 1}
                          value={step}
                          onValueChange={(newStep) => handleChangeStep(newStep, groupIndex, stepIndex)}
                          onAdd={() => handleAddStep(groupIndex, stepIndex)}
                          onRemove={() => handleRemoveStep(groupIndex, stepIndex)}
                          size="sm"
                        />
                      ) : (
                        <span>{step}</span>
                      )}
                    </li>
                  ))}
                </ol>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </form>
  );
};
