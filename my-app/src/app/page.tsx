'use client';
import { useState } from 'react';
import { getAllData } from './api';

type shop = {
  name: string;
  address: string;
  logo_image: string;
  photo: {
    pc: {
      l: string;
    };
  };
};

export default function Home() {
  const [results, setShops] = useState<{ shop: shop[] }>({ shop: [] });
  const [geolocation, setGeolocation] = useState<{
    lat: number | null;
    lon: number | null;
  }>({
    lat: null,
    lon: null,
  });

  const searchShops = async () => {
    const { lat, lon } = geolocation;
    if (lat === null || lon === null) {
      window.alert('現在地を取得してください。');
      return;
    }
    const data = await getAllData(lat, lon);
    setShops(data.results);
  };

  const getPosition = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setGeolocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        (error) => {
          window.alert('位置情報の取得に失敗しました。');
        }
      );
    } else {
      window.alert('このブラウザはGeolocationをサポートしていません。');
    }
  };

  return (
    <main className='flex min-h-screen flex-col items-center p-24'>
      <h1 className='text-xl pb-10'>where-my-lunch</h1>
      <button
        className='w-full px-8 py-6 bg-slate-300 shadow-md rounded-lg mb-10'
        onClick={getPosition}
      >
        現在地を取得
      </button>
      <button
        className='w-full px-8 py-6 bg-slate-300 shadow-md rounded-lg'
        onClick={searchShops}
      >
        お店を検索
      </button>
      {results.shop.map((s: shop, i: number) => {
        if (i % 2 === 1) return null; // 奇数インデックスをスキップ
        const nextShop: shop | never = results.shop[i + 1];
        return (
          <div className='w-full px-8 py-6 rounded-lg flex items-center gap-x-4 items-stretch'>
            <div className='w-full px-8 py-6 bg-slate-300 shadow-md rounded-lg flex items-center gap-x-2'>
              <div>
                <img src={s.logo_image} alt='' />
                <img src={s.photo.pc.l} alt='' />
              </div>
              <div>
                <h2 className='text-xl'>{s.name}</h2>
                <p className='text-sm'>{s.address}</p>
              </div>
            </div>
            {nextShop && (
              <div className='w-full px-8 py-6 bg-slate-300 shadow-md rounded-lg flex items-center gap-x-2'>
                <div>
                  <img src={nextShop.logo_image} alt='' />
                  <img src={nextShop.photo.pc.l} alt='' />
                </div>
                <div>
                  <h2 className='text-xl'>{nextShop.name}</h2>
                  <p className='text-sm'>{nextShop.address}</p>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </main>
  );
}
