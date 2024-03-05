import { Tag } from "./tag";

export type Recipe = {
  id: string;
  slug: string;
  name: string;
  description: string;
  img?: string;
  createdAt: Date;
  ingredients: Ingredient[];
  steps: Step[];
  tags: Tag[];
  people: Number;
};

export type Ingredient = {
  group: string;
  ingredients: string[];
};

export type Step = {
  group: string;
  steps: string[];
};
