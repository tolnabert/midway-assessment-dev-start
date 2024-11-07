import { Recipe, RecipeType } from './recipe';
import { Store } from './stores/store.type';

export async function list(store: Store<RecipeType[]>, args: string[]) {
  const recipe = new Recipe(store);
  const recipes = await recipe.readAll();

  if (args.length > 0) {
    throw new Error('Wrong command: list should not have any arguments');
  }

  const formatted = recipes
    .map((recipe) => `- [${recipe.id}] ${recipe.name}`)
    .join('\n');
  console.log('Your recipes:');
  console.log(formatted);
}

export async function detailsByRecipeId(
  store: Store<RecipeType[]>,
  args: string[]
) {
  const recipe = new Recipe(store);
  const recipes = await recipe.readAll();

  if (args.length > 1 || isNaN(parseInt(args[0]))) {
    throw new Error('Please provide a numeric value only as an ID');
  }

  const id = parseInt(args[0]);

  const recipeToFind: RecipeType[] = recipes.filter(
    (recipe) => recipe.id === id
  );
  if (id <= recipes.length) {
    console.log(
      `ID: ${recipeToFind[0].id}` + '\n' + `Name: ${recipeToFind[0].name}`
    );
  } else {
    console.log('There is no recipe with that ID');
  }
}
