## ESSENTIALS
### Points
108. When we are using server component we don't need to use useEffect instead we can get data by it self.
- Server Component can have async await
- Client Compnent doesn't have async await
- All Components are by default Server Components
- By Default Next build the Project as Prerender and also Cache it
- NextJS Caches the Pages to Change this behaviour to regenerate the page we have to use revalidatePath
- - revalidatePath('/meals', 'layout' || 'page'); Second Args says wheather to revalidate children as well
- 
### HOW TO 