'use client';

import React from 'react';

function Layout({ children }) {
  return (
    <div className="relative flex flex-col h-screen  items-center bg-[#EEEEEE] ">{children}</div>
  );
}

export default Layout;
