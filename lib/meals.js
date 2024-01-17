import { gets } from "./crud";

export async function getMeals() {
  await new Promise(
    (resolve) => setTimeout(resolve, 2000)
  )
  throw new Error('Failed to load data!')
  return gets('SELECT * FROM meals');
}