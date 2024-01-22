## ESSENTIALS
### Points
108. When we are using server component we don't need to use useEffect instead we can get data by it self.
- Server Component can have async await
- Client Compnent doesn't have async await
- All Components are by default Server Components
- By Default Next build the Project as Prerender and also Cache it
- NextJS Caches the Pages to Change this behaviour to regenerate the page we have to use revalidatePath
- - revalidatePath('/meals', 'layout' || 'page'); Second Args says wheather to revalidate children as well
- As its already mentioned above _app.js doesn't support getStaticProps or getServerSideProps , you can only use getInitialProps inside _app.js
### READING FILE IN FILE SYSTEM 

```javascript
  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json')
  const jsonData = await fs.readFile(filePath)y
  const data = JSON.parse(jsonData);
```

### Saving File in File System