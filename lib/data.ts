import { Recipe } from "@/types/recipe";

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
        group: "Dough",
        ingredients: ["300 grams all-purpose flour", "5 grams instant yeast", "5 grams salt", "200 milliliters warm water", "15 milliliters olive oil"],
      },
      {
        group: "Topping",
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
        group: "Dough",
        steps: [
          "In a large mixing bowl, combine the all-purpose flour, instant yeast, and salt.",
          "Gradually add warm water while stirring until the dough comes together.",
          "Knead the dough on a floured surface for about 5-7 minutes until it becomes smooth and elastic.",
          "Place the dough back into the bowl, cover it with a clean kitchen towel, and let it rise in a warm place for about 1 hour or until it doubles in size.",
        ],
      },
      {
        group: "Topping",
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
        group: "Serving",
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

export const getRecipes = () => recipes;
export const getRecipe = (slug: string) => recipes.find((x) => x.slug === slug);
