'use client';
import ImagePicker from '@/components/meals/image-picker';
import classes from './page.module.css';
import { shareMeal } from '@/lib/action';
import MealsFormSubmit from '@/components/meals/meals-form-submit';
import { useFormState } from 'react-dom';

// CLIENT COMPONENT DONT USE METADATA LIKE THIS
// export const metadata = {
//   title: 'Add Meals',
//   description: 'Add Meals and share with the world so they know.'
// }
export default function ShareMealPage() {
  // NOT FOR CLIENT COMPOENTS
  // async function shareMeal(formData: any) {
  //   'use server';
  //   const meal = {
  //     title: formData.get('title'),
  //     image: formData.get('image'),
  //   }
  // }
  const [error, formAction] = useFormState(shareMeal, { message: null } as any);
  return (
    <>
      <header className={classes.header}>
        <h1>
          Share your <span className={classes.highlight}>favorite meal</span>
        </h1>
        <p>Or any other meal you feel needs sharing!</p>
      </header>
      <main className={classes.main}>
        <form className={classes.form} action={formAction}>
          <div className={classes.row}>
            <p>
              <label htmlFor="name">Your name</label>
              <input type="text" id="name" name="name" required />
            </p>
            <p>
              <label htmlFor="email">Your email</label>
              <input type="email" id="email" name="email" required />
            </p>
          </div>
          <p>
            <label htmlFor="title">Title</label>
            <input type="text" id="title" name="title" required />
          </p>
          <p>
            <label htmlFor="summary">Short Summary</label>
            <input type="text" id="summary" name="summary" required />
          </p>
          <p>
            <label htmlFor="instructions">Instructions</label>
            <textarea
              id="instructions"
              name="instructions"
              rows={10}
              required
            ></textarea>
          </p>
          <ImagePicker label="Your Image" name="image" />
          {error?.message ? <p>{error?.message}</p> : ''}
          <p className={classes.actions}>
            <MealsFormSubmit />
          </p>
        </form>
      </main>
    </>
  );
}
