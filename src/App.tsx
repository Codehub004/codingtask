function App() {
  return (
    <div className="flex flex-col gap-10 items-center justify-center h-full">
      <a href="/contacts" className="bg-green-400 text-2xl font-semibold tracking-widest text-white p-4 rounded-2xl hover:text-amber-600 hover:bg-green-100 transition-all ease-in-out duration-300">Let's go to Contacts Page</a>
      <a href="/maps" className="bg-amber-400 text-2xl font-semibold tracking-widest text-white p-4 rounded-2xl hover:text-amber-600 hover:bg-amber-100 transition-all ease-in-out duration-300">Let's get you to Maps and Charts Page</a>
    </div>
  );
}

export default App;
