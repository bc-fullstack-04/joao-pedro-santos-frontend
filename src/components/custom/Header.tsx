import { useAuth } from '@/hooks/UseAuth';
import logo from '../../assets/logo.svg';
import icon from '../../assets/icon.svg';
import { Link } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Header() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <header className='flex justify-between py-3 px-16 backdrop-blur-xl backdrop-contrast-50 flex-wrap max-sm:p-1 max-sm:gap-4 max-sm:justify-center max-sm:items-center'>
        <div className='flex items-center justify-center gap-2'>
          <Link to={'/'}>
            <img src={logo}  />
          </Link>
          <span className='text-white'>BootPlay</span>
        </div>
        <div className='flex items-center gap-3 '>
          {isAuthenticated ? 
            <div className='flex items-center justify-center gap-4 sm:gap-6 md:gap-10 lg:gap-16'>
              <Link className='flex items-center justify-center text-white text-center h-10 font-semibold rounded-3xl' to={'/collection'}>Meus Discos</Link>
              <Link className='flex items-center justify-center text-white h-10 font-semibold rounded-3xl' to={'/wallet'}>Carteira</Link>
              <DropdownMenu>
                <DropdownMenuTrigger><img src={icon}  /></DropdownMenuTrigger>
                <DropdownMenuContent className='bg-[#19181F] text-white'>
                  <DropdownMenuLabel>Minha conta</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className='text-red-300 font-semibold hover:cursor-pointer hover:scale-105 transition' onClick={logout} >Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          : 
          <>
            <Link to={'/login'}><button className='bg-black text-white h-10 px-14 font-semibold rounded-3xl max-sm:px-8'>Entrar</button></Link>
            <Link to={'/signup'}><button className='bg-[#9EE2FF] text-black h-10 px-14 font-semibold rounded-3xl max-sm:px-8'>Inscrever-se</button></Link>
          </>
          }
          
        </div>
      </header>
  )
}
