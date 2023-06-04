const Sidebar = () => {
  return (
    <>
      <div className="md:flex hidden flex-col items-center justify-between py-10 px-2 fixed bg-green-500 rounded-xl h-1/2 w-20 top-[25%] left-4">
        <a href="/contacts" className="text-lg text-white hover:text-green-950 ease-in-out transition-colors duration-200 font-semibold rotate-180" style={{ writingMode: 'vertical-rl' }}>Contacts</a>
        <a href="/maps" className="text-lg text-white hover:text-green-950 ease-in-out transition-colors duration-200 font-semibold text-center rotate-180" style={{ writingMode: 'vertical-rl' }}>Charts and Maps</a>
      </div>
      <div className="flex md:hidden flex-row items-center justify-between p-4 fixed bg-green-500 rounded-xl w-full bottom-0">
        <a href="/contacts" className="text-lg text-white hover:text-green-950 ease-in-out transition-colors duration-200 font-semibold">Contacts</a>
        <a href="/maps" className="text-lg text-white hover:text-green-950 ease-in-out transition-colors duration-200 font-semibold text-center">Charts and Maps</a>
      </div>
    </>
  )
};

export default Sidebar;
