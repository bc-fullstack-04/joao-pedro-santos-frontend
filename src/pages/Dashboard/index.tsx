import * as React from "react";
import './style.css';
import { useEffect, useState } from "react";
import { albumApi } from "@/services/apiService";
import { AlbumModel } from "@/models/AlbumModel";
import Header from "@/components/custom/Header";
import glass from '../../assets/glass.svg';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
import toast from "react-hot-toast";

type AlbumSale = {
  name: string,
  idSpotify: string,
  artistName: string,
  imageUrl: string,
  value: number,
};

export function Dashboard() {
  const [albums, setAlbums ] = useState<AlbumModel[]>([]);
  const [search, setSearch] = useState<string>("");
  const [isSearched, setIsSearched] = useState<boolean>(false);

  const Authorization = `Basic ${localStorage.getItem('@Auth.Token')}`.replace(/"/g, '');

  useEffect(() => {  
    albumApi.get('/albums/all?search=Rock', {headers: { Authorization }})
    .then((resp) => {
      setAlbums(resp.data);
      setIsSearched(false);
    })
  }, []);

  function handleSearch(event: React.FormEvent) {
    event.preventDefault();

    if(search.trim().length > 0){
      albumApi.get(`/albums/all?search=${search}`, { headers: { Authorization } })
      .then((resp) => {
        setAlbums(resp.data);
        setIsSearched(true);
      })
    }
  }

  function handleSale(sale: AlbumSale) {
    const userData = (localStorage.getItem('@Auth.Data'));
    const { id, name, email } = (JSON.parse(userData || ""));
    const users = {id, name, email};
    albumApi.post('/albums/sale', { ...sale, users }, { headers: { Authorization } })
    .then(resp =>  {
      toast.success('Album comprado com sucesso!');
    })
    .catch(err => {
      toast.error('Album já está adquirido!');
    });
  }

  return (
      <main className="flex flex-col h-screen">
        <div className="bg-coqueiro bg-cover bg-no-repeat shadow">
          <Header />
          <div className="backdrop-brightness-50 flex flex-col justify-center h-[35vh] lg:h-[50vh] 2xl:h-[60vh]">
            <h1 className= "text-white text-3xl px-4 font-semibold sm:pl-12 sm:text-5xl lg:w-[504px]">
              A história da música não pode ser esquecida!
            </h1>
            <p className="text-white p-4 sm:pl-12">Sucessos que marcaram o tempo!!!</p>
          </div>
        </div>
        
        <div className="bg-[#19181F] my-blur flex flex-col flex-grow gap-4">

          <form className="flex items-center w-[85%] border rounded-lg p-0 border-white mx-auto sm:w-[60%] md:w-[50%] lg:w-[40%] xl:w-[30%]">
            <input type="text" onChange={(e) => setSearch(e.target.value)} className="w-[85%] px-4 py-2 text-white bg-inherit focus-within:outline-none"  /> 
            <button className="flex items-center justify-center hover:scale-110 transition flex-grow" onClick={(e) => { handleSearch(e) }}>
              <img src={glass}  />
            </button>
          </form>

          <div className="mt-4 pl-8 sm:mt-8 sm:pl-16 md:pl-20 lg:pl-56">
            {isSearched ? <></> : <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Trends</h1> }
          </div>

          <div className="flex items-center justify-center overflow-hidden mb-8">
            <div className={`${isSearched ? 'flex flex-wrap justify-center items-center gap-12 px-4 sm:px-6 md:px-10 lg:px-20' : 'carousel-home relative left-0 flex items-center'}`}>
              {albums.map((album, i) =>(
                <div className={`${isSearched ? '': 'pr-8'} bg-[#19181F]`}>
                  <Dialog>
                    <DialogTrigger className="rounded-md">
                      <div key={i} style={{'--bg-fundo': `url(${album.images[0].url})`} as React.CSSProperties} className="bg-[image:var(--bg-fundo)] bg-cover bg-no-repeat w-60 h-[245px] rounded-md hover:scale-110 transition">
                        <div className={`flex h-full justify-center items-center backdrop-brightness-50 p-6 cursor-pointer hover:scale-105 transition ${isSearched ? 'mb-4' : ''}`}>
                          <h1 className="text-2xl font-semibold text-center text-white">{album.name}</h1>
                        </div>
                      </div>
                      </DialogTrigger>
                    <DialogContent className="flex gap-0 bg-white p-0 h-[30%] rounded-md">
                      <img className="rounded-tl-md" src={album.images[0].url} />
          
                      <div className="flex flex-col flex-grow px-2 sm:px-4 justify-between mt-10 mb-6 items-center">
                        <div className="flex flex-col gap-2 mb-3 w-full">
                          <h2 className="text-center text-sm font-semibold">{album.name}</h2>
                          <p className="w-full text-sm px-2 sm:px-8">R$ {album.value.toString().replace('.', ',')}</p>
                          <p className="w-full text-sm px-2 sm:px-8">{album.artists[0].name}</p>
                        </div>
                        <DialogClose className="p-0 m-0 w-full">
                          <button onClick={(e) => handleSale({
                            artistName: album.artists[0].name,
                            idSpotify: album.id,
                            imageUrl: album.images[0].url,
                            name: album.name,
                            value: album.value
                            })}  className="bg-[#FBBC05] h-10 w-[90%] rounded-3xl text-white hover:scale-110 transition" >
                            Comprar
                          </button>
                        </DialogClose>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
  )
}
