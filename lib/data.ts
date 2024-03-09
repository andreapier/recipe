import { Recipe } from "@/types/recipe";
import { cloneDeep } from "lodash";

const recipes: Recipe[] = [
  {
    id: "pizza-margherita",
    slug: "pizza-margherita",
    name: "Pizza Margherita",
    description: "This recipe yields one delicious Pizza Margherita, perfect for sharing with family and friends.",
    img: "/pizza-margherita.avif",
    people: 4,
    createdAt: new Date(),
    ingredients: [
      {
        name: "Dough",
        ingredients: ["300 grams all-purpose flour", "5 grams instant yeast", "5 grams salt", "200 milliliters warm water", "15 milliliters olive oil"],
      },
      {
        name: "Topping",
        ingredients: [
          "400 grams ripe tomatoes",
          "200 grams fresh mozzarella cheese",
          "15 milliliters olive oil",
          "5 grams salt",
          "A handful of fresh basil leaves",
        ],
      },
    ],
    steps: [
      {
        name: "Dough",
        steps: [
          "In a large mixing bowl, combine the all-purpose flour, instant yeast, and salt.",
          "Gradually add warm water while stirring until the dough comes together.",
          "Knead the dough on a floured surface for about 5-7 minutes until it becomes smooth and elastic.",
          "Place the dough back into the bowl, cover it with a clean kitchen towel, and let it rise in a warm place for about 1 hour or until it doubles in size.",
        ],
      },
      {
        name: "Topping",
        steps: [
          "Wash and dice the ripe tomatoes, then drain excess liquid.",
          "Tear the fresh mozzarella cheese into small pieces.",
          "Wash and dry the fresh basil leaves.",
          "Preheat the oven to 220°C.",
          "On a floured surface, roll out the risen dough into a circular shape, about 30 cm in diameter.",
          "Transfer the rolled-out dough to a baking sheet lined with parchment paper.",
          "Drizzle olive oil over the surface of the dough and spread it evenly.",
          "Evenly distribute the diced tomatoes and torn mozzarella cheese over the dough.",
          "Sprinkle salt over the topping.",
          "Place the pizza in the preheated oven and bake for 12-15 minutes or until the crust is golden brown and the cheese is bubbly and slightly browned.",
          "Once out of the oven, garnish with fresh basil leaves.",
        ],
      },
      {
        name: "Serving",
        steps: ["Slice the Pizza Margherita into wedges using a pizza cutter or a sharp knife.", "Serve hot and enjoy!"],
      },
    ],
    tags: [],
  },
  {
    id: "spaghetti-carbonara",
    slug: "spaghetti-carbonara",
    name: "Spaghetti alla Carbonara",
    description: "Pasta e uova!",
    img: "/spaghetti-carbonara.avif",
    people: 4,
    createdAt: new Date(),
    ingredients: [],
    steps: [],
    tags: [],
  },
  {
    id: "ribs",
    slug: "ribs",
    name: "Ribs",
    description: "Costine in salsa barbecue",
    img: "/ribs.jpg",
    people: 4,
    createdAt: new Date(),
    ingredients: [],
    steps: [],
    tags: [],
  },
  {
    id: "gelato-stracciatella",
    slug: "gelato-stracciatella",
    name: "Gelato alla stracciatella",
    description: "Fare il gelato in casa è facile",
    img: "/gelato-stracciatella.avif",
    people: 4,
    createdAt: new Date(),
    ingredients: [],
    steps: [],
    tags: [],
  },
  {
    id: "no-img",
    slug: "no-img",
    name: "Senza immagine",
    description: "Verificare come viene renderizzata",
    people: 4,
    createdAt: new Date(),
    ingredients: [],
    steps: [],
    tags: [],
  },
];

export const getRecipes = async (page: number = 1, perPage: number = 8) => {
  "use server";

  const tmp = [...recipes, ...recipes, ...recipes, ...recipes, ...recipes, ...recipes, ...recipes];

  return {
    total: tmp.length,
    items: tmp
      .filter((_, i) => i >= (page - 1) * perPage && i < page * perPage)
      .map((x) => ({
        id: Math.random().toString(),
        name: x.name,
        slug: x.slug,
        description: x.description,
        img: x.img,
        createdAt: x.createdAt,
        people: x.people,
        tags: x.tags,
      })),
  };
};
export const getRecipe = (slug: string) => cloneDeep(recipes.find((x) => x.slug === slug));
