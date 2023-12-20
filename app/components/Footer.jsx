'use client';

import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function Footer() {
  const [count, setCount] = useState('');
  useEffect(() => {
    async function getDataCount() {
      const response = await axios.get('/api/shortlink');
      setCount(response.data);
    }
    getDataCount();
  }, []);
  return (
    <>
      <div className="w-full h-[50vh] bg-cover bg-[url('/bg-shortlink.jpg')] mix-blend-multiply flex flex-col items-center justify-center gap-2">
        <h1 className="text-[58px] font-bold text-[#4E4FEB]">{count}</h1>
        <h2 className="font-semibold text-black/70 uppercase">TAUTAN DISINGKAT OLEH zseev.me</h2>
      </div>
      <div className="h-20 bg-black w-full text-white/80 flex justify-center items-center">
        Created By ig:@mhafid_a
      </div>
    </>
  );
}
