'use client';
export default function Error({error}: any) {
  return (
    <main className="error">
      <h1>An error occured!</h1>
      <p>Failed to fetch meal data. Please try again</p>
    </main>
  )
}