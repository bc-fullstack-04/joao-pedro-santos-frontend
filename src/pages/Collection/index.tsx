import Header from '@/components/custom/Header'
import { albumApi } from '@/services/apiService';
import { useEffect, useState } from 'react';
import { AlbumSale } from '../Dashboard';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import fileVideo from '../../assets/file-video.svg';
import dollarSign from '../../assets/dollar-sign.svg';

export default function Collection() {
  const Authorization = `Basic ${localStorage.getItem('@Auth.Token')}`.replace(/"/g, '');
  const [albums, setAlbums ] = useState<AlbumSale[]>([]);

  useEffect(() => {  
    albumApi.get('/albums/my-collection', { headers: { Authorization } })
    .then((resp) => {
      setAlbums(resp.data);
    })
  }, []);


  return (
    <main className='bg-[#19181F] h-screen'>
      <Header />
      <section className='py-12 flex flex-col items-center bg-[#19181F] sm:items-start'>
        <h1 className='sm:px-20 text-white text-4xl font-bold mb-4 flex'>Meus Discos</h1>
        <div className='sm:px-20 mb-8 flex flex-col gap-4'>
          <div className='flex gap-4 items-center pl-4 h-[87px] w-[237px] rounded-xl bg-white text-black'>
            <img className='w-[36px] h-[36px] bg-black p-2 rounded-full' src={fileVideo}/>
            <div>
              <p>Total de Albums</p>
              <p className='text-2xl'>{albums.length}</p>
            </div>
          </div>
          <div className='flex gap-4 items-center pl-4 h-[87px] w-[237px] rounded-xl bg-white text-black'>
            <img className='w-[36px] h-[36px] bg-black p-2 rounded-full' src={dollarSign}/>
            <div>
              <p>Valor investido</p>
              <p className='text-2xl'>R$ {albums.map(album => album.value).reduce((acc, val) => acc + val, 0).toFixed(2).toString().replace(/\./g, ',')}</p>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center overflow-hidden mb-8 bg-[#19181F]">
            <div className={`flex flex-wrap justify-center items-center gap-12 sm:px-12`}>
              {albums.map((album, i) =>(
                  <Dialog>
                    <DialogTrigger className="rounded-md">
                      <div key={i} style={{'--bg-fundo': `url(${album.imageUrl})`} as React.CSSProperties} className="bg-[image:var(--bg-fundo)] bg-cover bg-no-repeat w-60 h-[245px] rounded-md hover:scale-110 transition">
                        <div className={`flex h-full justify-center items-center backdrop-brightness-50 p-6 cursor-pointer hover:scale-105 transition mb-4`}>
                          <h1 className="text-2xl font-semibold text-center text-white">{album.name}</h1>
                        </div>
                      </div>
                      </DialogTrigger>
                    <DialogContent className="flex gap-0 bg-white p-0 h-[30%] rounded-md">
                      <img className="rounded-tl-md" src={album.imageUrl} />
          
                      <div className="flex flex-col flex-grow px-2 sm:px-4 justify-between mt-10 mb-6 items-center">
                        <div className="flex flex-col gap-2 mb-3 w-full">
                          <h2 className="text-center text-sm font-semibold">{album.name}</h2>
                          <p className="w-full text-sm px-2 sm:px-8">R$ {album.value.toString().replace('.', ',')}</p>
                          <p className="w-full text-sm px-2 sm:px-8">{album.artistName}</p>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
              ))}
            </div>
          </div>
      </section>
    </main>
  )
}
