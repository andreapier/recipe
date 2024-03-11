import { Schema, model, models } from "mongoose";
import { Recipe } from "@/lib/types/recipe";

const recipeSchema = new Schema<Recipe>(
  {
    name: {
      type: String,
      required: true,
      min: 3,
      max: 200,
    },
    slug: {
      type: String,
      required: true,
      min: 3,
      unique: true,
    },
    description: {
      type: String,
      max: 200,
    },
    img: {
      type: String,
    },
    people: {
      type: Number,
      required: true,
      min: 1,
    },
    tags: {
      type: [String],
      required: true,
      default: [],
    },
    ingredients: {
      type: [
        {
          _id: false,
          name: {
            type: String,
            require: true,
            min: 3,
            max: 200,
          },
          items: {
            type: [String],
            required: true,
            default: [],
          },
        },
      ],
      required: true,
      default: [],
    },
    steps: {
      type: [
        {
          _id: false,
          name: {
            type: String,
            require: true,
            min: 3,
            max: 200,
          },
          items: {
            type: [String],
            required: true,
            default: [],
          },
        },
      ],
      required: true,
      default: [],
    },
  },
  { timestamps: true },
);

export const RecipeModel = models.Recipe || model("Recipe", recipeSchema);
