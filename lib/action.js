'use server';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache'
import { saveMeal } from './meals'
import { Validate } from './util';

export async function shareMeal(prevState,formData) {
  const meal = {
    title: formData.get('title'),
    summary: formData.get('summary'),
    instructions: formData.get('instructions'),
    image: formData.get('image'),
    creator: formData.get('name'),
    creator_email: formData.get('email'),
  }
  try{
    Validate(meal,'title');
    Validate(meal,'summary');
    Validate(meal,'instructions');
    Validate(meal,'creator');
    Validate(meal,'creator');
    Validate(meal,'creator_email');
  
  } catch (err) {
    return {
      message: err.message
    }
  }
 
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