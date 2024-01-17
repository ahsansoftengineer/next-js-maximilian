export default function NotFound(info: any) {
  console.log(info) 
  return (
    <main className="not-found">
      <h1>Not found!</h1>
      <p>
        Unfortunately, we could not find the requested page or resource.
      </p>
    </main>
  )
}