import Link from 'next/link';
import classes from './page.module.css';
import classes2 from '@/app/loading.module.css';
import MealsGrid from '@/components/meals/meals-grid';

import { getMeals } from '@/lib/meals';
import { Suspense } from 'react';

export const metadata = {
  title: 'All Meals',
  description: 'Browse the delicious meals shared by our vibrant customers'
}
export default async function MealsPage() {
  return (
    <>
      <header className={classes.header}>
        <h1>
          Delicious meals, created &nbsp;
          <span className={classes.highlight}>by you</span>
        </h1>
        <p>
          Choose your favorite recipe and cook it yourself, It is easy and fun!
        </p>
        <p className={classes.cta}>
          <Link href="/meals/share">Share your Favorite Recipe</Link>
        </p>
      </header>
      <main className={classes.main}>
        <Suspense
          fallback={
          <h1 className={classes2.loading}>
            Meals Loading...
          </h1>}
        >
          <Meals />
        </Suspense>
      </main>
    </>
  );
}
export async function Meals() {
  const meals = await getMeals();
  return <MealsGrid meals={meals} />;
}
