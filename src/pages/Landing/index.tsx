import { AlbumModel } from '@/models/AlbumModel';
import { albumApi } from '@/services/apiService';
import React, { useEffect, useState } from 'react';

export default function Landing() {
  const [albums, setAlbums] = useState<AlbumModel[]>([]);

  useEffect(() => {
    albumApi.defaults.headers.common.Authorization =
      'Basic bWFpbEBtYWlsLmNvbTokMmEkMTAkR2htdG91L3d1WkY5L0wwWHdqQ0pPT2hDRVJ4MUNIZFhuZW9HTk5HT0pDZmNITDgweUpiT3U';
    albumApi.get('/albums/all?search=Rock').then((response) => {
      setAlbums(response.data);
      console.log(response.data);
    });
  }, []);

  function handleLink(url: string): undefined {
    window.open(url, '_blank');
  }

  return (
    <main className="flex flex-col items-center justify-center h-full mt-10 gap-4">
      <h1 className="text-2xl font-semibold">Albums</h1>

      <section className="flex flex-wrap gap-4 justify-center h-full m-2">
        {/* Card */}
        {albums?.map((album, i) => (
          <div
            style={{ '--bg-card': `url(${album.images[0].url})` } as React.CSSProperties}
            className="bg-[image:var(--bg-card)] bg-cover bg-no-repeat w-60 h-[245px] rounded-md"
          >
            <div
              onClick={() => handleLink(album.externalUrl.externalUrls.spotify)}
              className="flex h-full justify-center items-center backdrop-brightness-50 p-6 cursor-pointer"
            >
              <h1 className="text-2xl font-semibold text-white text-center">{album.name}</h1>
            </div>
          </div>
        ))}
        {/* Card */}
      </section>
    </main>
  );
}
