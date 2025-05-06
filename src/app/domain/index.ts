import Recipes from "./recipes/Recipes";

type RecipesController = typeof Recipes;

const controllers = <RecipesController[]>[Recipes];

export { controllers };
