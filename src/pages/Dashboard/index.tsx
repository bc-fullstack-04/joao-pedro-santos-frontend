import * as React from "react";
import './style.css';
import { useEffect, useState } from "react";
import { albumApi } from "@/services/apiService";
import { AlbumModel } from "@/models/AlbumModel";
import { Link, useNavigate } from "react-router-dom";
import Header from "@/components/custom/Header";
import glass from '../../assets/glass.svg';

export function Dashboard() {
  const _navegate = useNavigate();
  const [albums, setAlbums ]= useState<AlbumModel[]>([]);

  const Authorization = `Basic ${localStorage.getItem('@Auth.Token')}`.replace(/"/g, '');

  useEffect(() => {  
    albumApi.get('/albums/all?search=Rock', {headers: { Authorization }})
    .then((resp) => {
      setAlbums(resp.data);
    })
  }, []);

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

          <div className="flex items-center w-[85%] border rounded-lg p-0 border-white mx-auto sm:w-[60%] md:w-[50%]">
            <input type="text" className="w-[85%] px-4 py-2 text-white bg-inherit focus-within:outline-none"  /> 
            <Link className="flex items-center justify-center hover:scale-110 transition flex-grow" to=""><img src={glass}  /></Link>
          </div>

          <div className="mt-4 pl-8 sm:mt-8 sm:pl-16 md:pl-20 lg:pl-40">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Trends</h1>
          </div>

          <div className="flex items-center justify-center overflow-hidden mb-8">
            <div className="carousel-home relative left-0 flex items-center">
              {albums.map((album, i) =>(
                <div className="pr-8 bg-[#19181F]">
                  <div key={i} style={{'--bg-fundo': `url(${album.images[0].url})`} as React.CSSProperties} className="bg-[image:var(--bg-fundo)] bg-cover bg-no-repeat w-60 h-[245px] rounded-md hover:scale-110 transition">
                    <div onClick={() => _navegate('')} className="flex h-full justify-center items-center backdrop-brightness-50 p-6 cursor-pointer  hover:scale-105 transition">
                      <h1 className="text-2xl font-semibold text-center text-white">{album.name}</h1>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div >
        </div>
      </main>
  )
}
