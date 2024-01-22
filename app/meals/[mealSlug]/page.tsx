import Image from 'next/image';
import classes from './page.module.css';
import { getMeal } from '@/lib/meals';
import { notFound } from 'next/navigation';
import path from 'node:path';
import fs from 'fs/promises';


// export async function generateStaticParams({params}: any) {
//   const meal = await getMeal(params.mealSlug);
//   return {
//     pageProps: {
//       meal,
//       params
//     },
//     revalidate: 10 // seconds
//   }
// }
// export async function generateMetadata({meal, params}: any) {
//   // const meal = await getMeal(params.mealSlug) || {}
//   return {
//     title: meal.title,
//     description: meal.summary
//   }
// }
// {meal, params }: any
export default async function MealDetailsPage(props: any) {
  // WHEN NOT USING GET STATIC PROPS
  console.log({props})
  const meal = await getMeal(props.params.mealSlug);
  console.log({meal})
  if(!meal) {
    return notFound();
  }
  const instructions =  meal.instructions.replaceAll('\n', '<br />')

  return (
    <>
      <header className={classes.header}>
        <div className={classes.image}>
          <Image fill src={meal.image} alt={meal.title} />
        </div>
        <div className={classes.headerText}>
          <h1>{meal.title}</h1>
          <p>
            by <a href={`mailto:${meal.creator_email}`}>
              {meal.creator}</a>
          </p>
          <p className={classes.summary}>
            {meal.summary}
          </p>
        </div>
      </header>
      <main className={classes.main}>
        <p
          className={classes.instructions}
          dangerouslySetInnerHTML={{
            __html: instructions,
          }}
        ></p>
      </main>
    </>
  );
}

 