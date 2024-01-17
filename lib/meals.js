import { gets } from "./crud";

export async function getMeals() {
  await new Promise(
    (resolve) => setTimeout(resolve, 2000)
  )
  return gets('SELECT * FROM meals');
}