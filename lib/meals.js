import { get, gets, modify } from "./crud";
import slugify from 'slugify'
import xss from 'xss'
import { SaveFileToDir, SaveFileToS3 } from './util'

export async function getMeals() {
  await new Promise(
    (resolve) => setTimeout(resolve, 2000)
  )
  // throw new Error('Failed to load data!')
  return gets('SELECT * FROM meals');
}
export async function getMeal(slug) {
  return get('SELECT * FROM meals WHERE slug = ?', slug);
}
export async function saveMeal(meal) {
  meal.slug = slugify(meal.title, { lower: true })
  meal.instructions = xss(meal.instructions)

  const result = await SaveFileToDir(meal.image, 'meal');
  // const result = await SaveFileToS3(meal.image, 'meal');
  if(!result?.Location) return;

  meal.image = result?.Location

  modify(`
    INSERT INTO meals 
    (
      title,
      summary,
      instructions,
      creator,
      creator_email,
      image,
      slug
    )
    VALUES 
    (
      @title,
      @summary,
      @instructions,
      @creator,
      @creator_email,
      @image,
      @slug
    )
  `, meal)
}
