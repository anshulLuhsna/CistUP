import React, { useState } from 'react';
import { DarkThemeToggle, Flowbite } from 'flowbite-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMugHot, faSearch } from '@fortawesome/free-solid-svg-icons';



function AboutPage() {

  const [openNavbarr, setOpenNavbarr] = useState(false)

const handleShowNavbar = () =>{
    setOpenNavbarr(!openNavbarr)
    
 }
  return (
<>
<div className='bg-white dark:bg-black text-black dark:text-white h-100% ' >
    <nav className="bg-white w-full top-0 border-gray-200 dark:bg-gray-900">

  

    <div className="flex flex-wrap items-center justify-between py-4 px-6 lg:px-12">

<div className="w-1/4">

  <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse lg:ml-8">

    <FontAwesomeIcon className='inline' icon={faSearch} />

    <span className="self-center text-3xl font-semibold whitespace-nowrap luckiest-guy-regular text-[#3282B8] dark:text-white">Object Detector</span>

  </a>

</div>

<button onClick={handleShowNavbar} data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">

  <span className="sr-only">Open main menu</span>

  <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">

    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>

  </svg>

</button>

<div className={`${openNavbarr ? 'block' : 'hidden'} w-full md:block md:w-auto`}>

  <ul className="font-medium flex flex-col items-center md:p-0 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">

    <li>

      <a href="/" className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white" aria-current="page">Home</a>

    </li>

    <li>

      <a href="/about" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">About</a>

    </li>

    <li>

      <DarkThemeToggle className="animate-spin" />

    </li>

  </ul>

</div>

</div>
</nav>

<div className="mt-12 h-screen flex flex-col ">

<h1 class="mb-4 mx-auto text-4xl font-extrabold text-gray-900 animate-pulse dark:text-white md:text-5xl lg:text-6xl"><span class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400 animate-bounce">OBJECT DETECTION</span></h1>
{/* <p class="text-lg font-normal mx-auto text-gray-500 lg:text-xl dark:text-gray-400">Here at Flowbite we focus on markets where technology, innovation, and capital can unlock long-term value and drive economic growth.</p> */}
<div className="w-full p-8 lg:w-1/2 lg:p-8 dark:bg-slate-800 bg-slate-200 mx-auto mt-12 text-xl lg:text-2xl comfortaa-regular">
<p class="mb-3  text-gray-500 dark:text-gray-400">This project is my submission for Round 1 of <strong class="font-semibold text-gray-900 dark:text-white">CistUP Summer internship</strong> screening tests.</p>
<p class="text-gray-500 dark:text-gray-400">This web application, developed using<strong class="font-semibold text-gray-900 dark:text-white"> React and Vite</strong> , showcases my proficiency in modern web development. Leveraging the power and flexibility of React, along with the efficient bundling provided by Vite, I've crafted a responsive and dynamic user experience.</p>

<p class="text-gray-500 dark:text-gray-400">To ensure sleek and polished styling, I've incorporated <strong class="font-semibold text-gray-900 dark:text-white"> TailwindCSS</strong>, enabling rapid development and easy maintenance of the project's visual elements.</p>
<p class="text-gray-500 dark:text-gray-400">On the backend, I've implemented a <strong class="font-semibold text-gray-900 dark:text-white"> Flask API </strong>to handle data processing and management seamlessly, enhancing the application's functionality and interactivity.</p>
<p class="text-gray-500 dark:text-gray-400">For object detection tasks, I've seamlessly integrated the pre-trained <strong class="font-semibold text-gray-900 dark:text-white"> YOLOv3-tiny model</strong>, optimizing its lightweight (35 MB) footprint to maintain performance without sacrificing efficiency.</p>
<div className="mx-auto">

<p class="text-gray-500 mt-8 mx-auto dark:text-gray-400"><strong class="font-semibold text-gray-900 dark:text-white"> Made by Anshul Kalbande </strong></p>
</div>

</div>

</div>


</div>
</>


  );
}

export default AboutPage;