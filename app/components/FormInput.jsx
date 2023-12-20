'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import axios from 'axios';

function FormInput() {
  const [payloadValues, setPayloadValues] = useState({ url_panjang: undefined, encode: undefined });
  const [shortUrl, setShortUrl] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [copied, setCopied] = useState(false);

  const changeUrl = (e) => {
    e.preventDefault();
    setPayloadValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async () => {
    try {
      setShortUrl('');
      setErrorMessage('');
      setCopied(false);
      const res = await axios.post('/api/shortlink', payloadValues);
      setShortUrl(res.data.encode_url);
    } catch (error) {
      setErrorMessage(error.response.data.error);
    }
  };

  const handleCopy = () => {
    const textToCopy = `http://localhost:3000/${shortUrl}`;
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => setCopied(true))
      .catch((err) => {
        console.error('Gagal menyalin teks: ', err);
      });
  };

  return (
    <>
      <div className="w-full flex flex-col md:flex-row md:h-10 gap-2 justify-center mt-6 items-center md:items-start">
        <input
          type="text"
          className="w-full md:w-[50%] py-2 px-4 md:px-3 rounded-sm shadow-md focus:outline-none focus:ring-2 focus:ring-[#4E4FEB]"
          placeholder="URL/Tautan panjang"
          onChange={changeUrl}
          name="url_panjang"
        />
        <input
          type="text"
          className="w-full md:w-[30%] py-2 px-4 md:px-3 rounded-sm shadow-md focus:outline-none focus:ring-2 focus:ring-[#4E4FEB]"
          placeholder="Nama yang diinginkan"
          onChange={changeUrl}
          name="encode"
        />
        <button
          type="submit"
          onClick={handleClick}
          className="w-[50%] md:w-[20%] bg-[#4E4FEB] py-2 px-4 mt-2 md:mt-0 rounded-sm text-[#EEEEEE] shadow-md hover:bg-[#4e78eb] transition-transform ease-in-out duration-500"
        >
          Perpendek URL
        </button>
      </div>

      {errorMessage && <div className="mt-5 text-red-600 italic">{errorMessage}</div>}
      {shortUrl && (
        <div className="mt-5 md:mt-10 flex flex-col gap-1 justify-center items-center">
          <div className="flex justify-center items-center gap-1 shadow-lg">
            <h1 className="bg-white px-5 py-2">localhost:3000/{shortUrl}</h1>
            <Image
              className="bg-white p-2 w-10 fill-[#4E4FEB] cursor-pointer"
              src="/copy.svg"
              alt="paste"
              width="30"
              height="6"
              onClick={handleCopy}
            />
          </div>
          <div className="text-green-500 font-extralight italic text-[15px] tracking-wide">
            {!copied ? 'Perpendek url berhasil di generate' : 'url telah di salin'}
          </div>
        </div>
      )}
    </>
  );
}

export default FormInput;
