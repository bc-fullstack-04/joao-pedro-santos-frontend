import { FormEvent, useState } from 'react';
import logo from '../../assets/logo.svg';
import { Input2 } from '@/components/custom/Input';
import { useAuth } from '@/hooks/UseAuth';
import { Navigate, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export function Signup() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const { register, isAuthenticated } = useAuth();
  const _navigate = useNavigate();

  async function handleRegister(event: FormEvent) {
    event.preventDefault();

    register(email, password, name)
      .then(() => { 
        toast.success("Cadastro efetuado com sucesso!");
        setTimeout(() => {
          _navigate('/');
        }, 2000);
      })
      .catch(() => {
        toast.error("Erro ao efetuar cadastro!");
      });
  }

  return (
    <>
      {isAuthenticated && <Navigate to='/dashboard'/>}
      <div className="bg-fundo bg-cover bg-no-repeat h-screen">
        <div className='flex items-center justify-center h-screen backdrop-blur-sm backdrop-brightness-50'>
          {/* Container */}
          <div className="flex max-w-[544px] bg-white p-10 rounded-md">
            <div className="flex flex-col items-center w-full gap-2">
              <img className="h-12" src={logo} />
              <h1 className="text-xl font-semibold">Criar conta</h1>
              {/* Form */}
              <form onSubmit={handleRegister} className="flex flex-col w-72">
                <Input2 id='name' onChange={e => setName(e.target.value)} type='text'>Nome completo:</Input2>
                <Input2 id='email' onChange={e => setEmail(e.target.value)} type='email'>Email:</Input2>
                <Input2 id='password' onChange={e => setPassword(e.target.value)} type='password'>Senha:</Input2>
                <button type='submit' className='p-3 rounded-3xl bg-zinc-900 text-white hover:bg-zinc-900/90 transition mb-3'>Criar conta</button>
              </form>
              <p className='text-xs font-light'>Já tem uma conta? <a className='font-semibold underline' href="/login">Entrar</a></p>
              {/* Form */}
            </div>
          </div>
          {/* Container */}
        </div>
      </div>
    </>
  );
}
