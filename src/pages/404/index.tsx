import Header from "@/components/custom/Header";

export function NotFound() {
  return (
    <div className='bg-[#19181F] h-screen'>
      <Header />
      <div className="mt-24 flex flex-col items-center md:mt-40">
        <div className="w-[75%] sm:w-[50%] md:w-">
          <h1 className="text-white text-4xl mb-4 md:text-7xl">404</h1>
          <p className="text-white md:text-xl">Ops! Página não encontrada</p>
        </div>
      </div>
    </div>
  )
}
