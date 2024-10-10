function App() {
  document.title = 'DevHub'
  return (
    <div className="flex w-full flex-1 flex-col items-center gap-20">
      <div className="animate-in flex max-w-4xl flex-1 flex-col px-3">
        <main className="flex flex-1 flex-col items-center justify-center gap-3">
          <h1 className="text-center text-3xl">
            <span className="font-bold text-slate-600">
              DevHub for share link
            </span>
            <br />
            built with
          </h1>
          <div className="flex flex-row items-center gap-2">
            <span className="font-bold text-slate-600">React</span> and
            <span className="font-bold text-slate-600">Supabase</span>
          </div>
        </main>
      </div>
    </div>
  )
}

export default App
