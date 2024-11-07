import { Recipe, RecipeType } from './recipe';
import { Store } from './stores/store.type';

export async function list(store: Store<RecipeType[]>, args: string[]) {
  const recipe = new Recipe(store);
  const recipes = await recipe.readAll();

  if(args.length > 0) {
    throw new Error ("Wrong command: list should not have any arguments")
  }

  const formatted = recipes
    .map((recipe) => `- [${recipe.id}] ${recipe.name}`)
    .join('\n');
  console.log('Your recipes:');
  console.log(formatted);
}
