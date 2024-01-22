

// MealDetailsPage.getInitialProps = async ({params}: any) => {
//   const meal = await getMeal(params.mealSlug);
//   console.log({meal})
//   return {
//     pageProps: {
//       meal,
//       params
//     },
//     revalidate: 10 // seconds
//   }
// }
// export async function getInitialProps({params}: any) {
//   const meal = await getMeal(params.mealSlug);
//   console.log({meal})
//   return {
//     pageProps: {
//       meal,
//       params
//     },
//     revalidate: 10 // seconds
//   }
// }

import { getMeal } from "@/lib/meals";

// export default  MealDetailsPage
export async function generateStaticProps({params}: any) {
  const meal = await getMeal(params.mealSlug);
  return {
    pageProps: {
      meal,
      params
    },
    revalidate: 10 // seconds
  }
}
export default function Layout({children} : any) {
  return children
}