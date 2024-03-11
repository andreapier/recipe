import { Types } from "mongoose";

export interface Recipe {
  _id: Types.ObjectId | string;
  slug: string;
  name: string;
  description: string;
  img?: string;
  createdAt: Date;
  tags: Array<string>;
  people: Number;
  ingredients: Array<RecipeItemsGroup>;
  steps: Array<RecipeItemsGroup>;
}

export interface RecipeItemsGroup {
  name: string;
  items: Array<string>;
}
