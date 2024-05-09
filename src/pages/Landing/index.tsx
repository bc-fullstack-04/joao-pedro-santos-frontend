import { Link } from 'react-router-dom';
import Header from '@/components/custom/Header';

export default function Landing() {
  return (
    <main className="flex flex-col bg-fundo bg-cover bg-no-repeat h-screen">
      <Header/>
      <section className='flex items-center px-40 h-full backdrop-brightness-50 max-lg:px-4 max-sm:p-2 max-sm:justify-center max-sm:w-auto'>
        <div className='flex flex-col flex-wrap gap-8 max-lg:text-center'>
          <h1 className='text-white text-4xl md:text-5xl lg:text-6xl font-semibold lg:w-[701px]'>A história da música não pode ser esquecida!</h1>
          <p className='text-white lg:w-[400px]'>Crie já sua conta e curta os sucessos que marcaram os tempos no Vinil.</p>
          <Link to={'/signup'}><button className='bg-[#9EE2FF] text-black h-12 px-14 font-semibold rounded-3xl'>Inscrever-se</button></Link>
        </div>
      </section>
    </main>
  );
}
