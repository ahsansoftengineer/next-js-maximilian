'use server';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache'
import { saveMeal } from './meals'

export async function shareMeal(prevState,formData) {
  const meal = {
    title: formData.get('title'),
    summary: formData.get('summary'),
    instructions: formData.get('instructions'),
    image: formData.get('image'),
    creator: formData.get('name'),
    creator_email: formData.get('email'),
  }
  validate(meal,'title');
  validate(meal,'summary');
  validate(meal,'instructions');
  validate(meal,'creator');
  validate(meal,'creator');
  validate(meal,'creator_email');

  if(
    !meal.creator_email.includes('@') ||
    !meal.image || 
    meal.image.size === 0 
  ) {
    return {
      message: 'Invalid Input'
    }
  }

  await saveMeal(meal)
  revalidatePath('/meals');
  redirect('/meals')
}
function validate(obj, key) {
  if(!obj[key] || obj[key].trim() === ''){
    throw new Error(`${key} is required`)
  }
}