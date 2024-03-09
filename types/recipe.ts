import { Tag } from "./tag";

export class RecipeHeader {
  public id = "";
  public slug = "";
  public name = "";
  public description = "";
  public img?: string;
  public createdAt = new Date();
  public tags = new Array<Tag>();
  public people = 4;
}

export class Recipe extends RecipeHeader {
  public ingredients = new Array<IngredientsGroup>();
  public steps = new Array<StepsGroup>();
}

export class IngredientsGroup {
  public name = "";
  public ingredients = new Array<string>();
}

export class StepsGroup {
  public name = "";
  public steps = new Array<string>();
}
