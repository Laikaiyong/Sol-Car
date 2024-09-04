'use client';

import React from 'react';
import { Car } from 'lucide-react';
import { cars } from '../data/carsSample';
import { useRouter } from 'next/navigation';

export default function Sidebar({ walletAddress, setCarId })  {
  const router = useRouter();

  function setActiveCar(car) {
    localStorage.setItem("car", car.id);
    setCarId(car.id);
    router.refresh();
  }
// Moxck data for cars
  return (
    <>
<header className="sticky top-0 inset-x-0 flex flex-wrap md:justify-start md:flex-nowrap z-[48] w-full bg-white border-b text-sm py-2.5 lg:ps-[260px] dark:bg-neutral-800 dark:border-neutral-700">
  <nav className="px-4 sm:px-6 flex basis-full items-center mx-auto">
    <div className="lg:me-0 lg:hidden">
    <div className="relative flex flex-col h-full max-h-full">
      <a className="flex rounded-xl text-xl font-semibold focus:outline-none focus:opacity-80 " href="/" aria-label="Preline">
        <img src={"/logo.png"} className="text-center w-[30px] h-[30px] justify-center items-center" />
        <p className="justify-center items-center mt-auto ml-2">SolCar</p>
      </a>
    </div>
    </div>

    <div className="w-full flex"></div>

<a
  className="flex items-center gap-x-3.5 py-2 px-2.5 bg-gray-100 text-sm text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:bg-neutral-700 dark:text-white"
  href={`https://solscan.io/address/USDC {walletAddress}`}
  target="_blank"
  rel="noopener noreferrer"
>
  <svg
    className="w-4 h-4 fill-current text-gray-500 dark:text-white"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
  >
    <path d="M0 0h24v24H0z" fill="none" />
    <path d="M19 12l-7 7-7-7h14zm0-2H5l7-7 7 7z" />
  </svg>
  {walletAddress?.slice(0, 5)}...{walletAddress?.slice(
														39)}
</a>
  </nav>
</header>
<div className="-mt-px">
  <div className="sticky top-0 inset-x-0 z-20 bg-white border-y px-4 sm:px-6 lg:px-8 lg:hidden dark:bg-neutral-800 dark:border-neutral-700">
    <div className="flex items-center py-2">
      <button type="button" className="size-8 flex justify-center items-center gap-x-2 border border-gray-200 text-gray-800 hover:text-gray-500 rounded-lg focus:outline-none focus:text-gray-500 disabled:opacity-50 disabled:pointer-events-none dark:border-neutral-700 dark:text-neutral-200 dark:hover:text-neutral-500 dark:focus:text-neutral-500" aria-haspopup="dialog" aria-expanded="false" aria-controls="hs-application-sidebar" aria-label="Toggle navigation" data-hs-overlay="#hs-application-sidebar">
        <span className="sr-only">Toggle Navigation</span>
        <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M15 3v18"/><path d="m8 9 3 3-3 3"/></svg>
      </button>
      <ol className="ms-3 flex items-center whitespace-nowrap">
        <li className="flex items-center text-sm text-gray-800 dark:text-neutral-400">
          SolCar
          <svg className="shrink-0 mx-3 overflow-visible size-2.5 text-gray-400 dark:text-neutral-500" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 1L10.6869 7.16086C10.8637 7.35239 10.8637 7.64761 10.6869 7.83914L5 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </li>
        <li className="text-sm font-semibold text-gray-800 truncate dark:text-neutral-400" aria-current="page">
          Car Details
        </li>
      </ol>
    </div>
  </div>
</div>

<div id="hs-application-sidebar" className="hs-overlay  [--auto-close:lg]
  hs-overlay-open:translate-x-0
  -translate-x-full transition-all duration-300 transform
  w-[260px] h-full
  hidden
  fixed inset-y-0 start-0 z-[60]
  bg-white border-e border-gray-200
  lg:block lg:translate-x-0 lg:end-auto lg:bottom-0
  dark:bg-neutral-800 dark:border-neutral-700" role="dialog" tabIndex="-1" aria-label="Sidebar">
  <div className="relative flex flex-col h-full max-h-full">
    <div className="px-6 pt-4 text-center items-center justify-center">
      <a className="flex rounded-xl text-xl font-semibold focus:outline-none focus:opacity-80 " href="/" aria-label="Preline">
        <img src={"/logo.png"} className="text-center w-8 justify-center items-center" />
        <p className="justify-center items-center mt-auto ml-2">SolCar</p>
      </a>
    </div>

    <div className="h-full overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
          <nav className="p-3 w-full flex flex-col flex-wrap">
            <ul className="flex flex-col space-y-1">
              <li>
                <a className="flex items-center gap-x-3.5 py-2 px-2.5 bg-gray-100 text-sm text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:bg-neutral-700 dark:text-white" href="#">
                  <Car size={16} />
                  Cars
                </a>
              </li>
            </ul>
            
              <ul className="mt-2 space-y-1">
                {cars.map((car) => (
                  <li onClick={() => setActiveCar(car)} key={car.id}>
                    <a className="cursor-pointer flex items-center p-2 text-sm text-gray-800 rounded-lg hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
                      <img src={car.image} alt={car.model} className="w-12 h-8 object-cover rounded mr-2" />
                      <div>
                        <p className="font-medium">{car.model}</p>
                        <p className="text-xs text-gray-500">{car.plate} - {car.color}</p>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
          </nav>
        </div>
  </div>
</div>

        </>
  );
}