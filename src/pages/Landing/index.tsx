import { Link } from 'react-router-dom';
import logo from '../../assets/logo.svg';

export default function Landing() {
  return (
    <main className="flex flex-col bg-fundo bg-cover bg-no-repeat h-screen">
      <header className='flex justify-between py-3 px-16 backdrop-blur-xl backdrop-contrast-50 flex-wrap max-sm:p-1 max-sm:gap-4 max-sm:justify-center max-sm:items-center'>
        <div className='flex items-center justify-center gap-2'>
          <img src={logo}  />
          <span className='text-white'>BootPlay</span>
        </div>
        <div className='flex items-center gap-3 '>
          <Link to={'/login'}><button className='bg-black text-white h-10 px-14 font-semibold rounded-3xl max-sm:px-8'>Entrar</button></Link>
          <Link to={'/signup'}><button className='bg-[#9EE2FF] text-black h-10 px-14 font-semibold rounded-3xl max-sm:px-8'>Inscrever-se</button></Link>
        </div>
      </header>
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
