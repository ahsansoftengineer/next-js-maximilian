## Posting Form in Next JS
1. Packages
```bash
pnpm i better-sqlite3
pnpm i slugify xss
```
2. CREATING TABLE
```javascript
const sql = require('better-sqlite3');
const db = sql('meals.db')

db.prepare(`
   CREATE TABLE IF NOT EXISTS meals (
       id INTEGER PRIMARY KEY AUTOINCREMENT,
       slug TEXT NOT NULL UNIQUE,
       title TEXT NOT NULL,
       image TEXT NOT NULL,
       summary TEXT NOT NULL,
       instructions TEXT NOT NULL,
       creator TEXT NOT NULL,
       creator_email TEXT NOT NULL
    )
`).run();
initData();
```
3. Reusable Code
```javascript
import sql from 'better-sqlite3';
const db = sql('meals.db');
export function modify(sql, data) {
  return db.prepare(sql).run(data);
}
export function get(sql, param) {
  return db.prepare(sql).get(param);
}
export function gets(sql) {
  return db.prepare(sql).all();
}
```
4. Seeding Data
```javascript
async function initData() {
  const stmt = db.prepare(`
      INSERT INTO meals VALUES (
         null,
         @slug,
         @title,
         @image,
         @summary,
         @instructions,
         @creator,
         @creator_email
      )
   `);
  for (const meal of dummyMeals) {
    stmt.run(meal);
  }
}

initData();
```
4. CRUD OPERATIONS
- CREATE
```javascript
import { get, gets, modify } from "./crud";
import slugify from 'slugify'
import xss from 'xss'
import { saveFile } from './util'

export async function SaveMeal(meal) {
  meal.slug = slugify(meal.title, { lower: true }) // kebab-case
  meal.instructions = xss(meal.instructions)

  meal.image = await SaveFile(meal.image, 'img-meal');
  
  modify(`
    INSERT INTO meals (title, summary, instructions)
    VALUES (@title, @summary, @instructions)
  `, meal)
}
```

2. Validating Form
```javascript
'use server';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache'
import { saveMeal } from './meals'

export async function shareMeal(prevState,formData) {
  const meal = {
    title: formData.get('title'),
    summary: formData.get('summary'),
  }
  try{
    validate(meal,'title');
    validate(meal,'creator_email');
  
  } catch (err) {
    return {
      message: err.message
    }
  }

  await saveMeal(meal)
  // revalidatePath tells NextJS to again Cache the Path

  // revalidatePath('/meals', 'layout' || 'page'); Second Args says wheather to revalidate children as well
  revalidatePath('/meals');
  redirect('/meals')
}
```
3. Form Action
```javascript
'use client';
import ImagePicker from '@/components/meals/image-picker';
import classes from './page.module.css';
import { shareMeal } from '@/lib/action';
import MealsFormSubmit from '@/components/meals/meals-form-submit';
import { useFormState } from 'react-dom';
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
  )
```