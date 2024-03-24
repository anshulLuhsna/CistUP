import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { DarkThemeToggle, Flowbite } from 'flowbite-react';


import { faMugHot, faSearch } from '@fortawesome/free-solid-svg-icons';
import "./App.css"
import CountUp from 'react-countup'
import AboutPage from './components/About';

function App() {

  const [selectedImage, setSelectedImage] = useState(null);

  const [detectedImage, setDetectedImage] = useState(null);
  const [originalImage, setOriginalImage] = useState(null);

  const [vehicleCount, setVehicleCount] = useState(0);
  const [openNavbar, setOpenNavbar] = useState(false);

  const handleImageUpload = (event) => {

    setSelectedImage(event.target.files[0]);

  };

// const handleDarkMode = () =>{
//   document.body.classList.toggle("dark")
// }

  const handleDetectObjects = async () => {

    const formData = new FormData();

    formData.append('image', selectedImage);



    try {

      const response = await axios.post('http://127.0.0.1:5000/detect', formData);
      setOriginalImage(`data:image/jpeg;base64,${response.data.original_image_base64}`);
      setDetectedImage(`data:image/jpeg;base64,${response.data.detected_image_base64}`);
      setVehicleCount(response.data.vehicle_count)
    } catch (error) {

      console.error('Error:', error);

    }

  };
 const handleShowNavbar = () =>{
    setOpenNavbar(!openNavbar)
    
 }


  return (
    
    <Flowbite>

    <div className='bg-white dark:bg-black text-black dark:text-white h-100% ' >

    <nav className="bg-white fixed w-full top-0 border-gray-200 dark:bg-gray-900">

  

    <div className="flex flex-wrap items-center justify-between py-4 px-6 lg:px-12">

<div className="w-1/4">

  <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse lg:ml-8">

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

<div className={`${openNavbar ? 'block' : 'hidden'} w-full md:block md:w-auto`}>

  <ul className="font-medium flex flex-col items-center md:p-0 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">

    <li>

      <a href="#" className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white" aria-current="page">Home</a>

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
   
    <div className="py-12 mt-12 px-8 lg:px-20 h-[125vh]  flex flex-col ">
    <div className="flex items-center justify-center w-full">
    <label for="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
            </svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400 comfortaa-regular"><span className="font-semibold">Click to upload</span> or drag and drop on the button</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 comfortaa-regular"></p>
        </div>
        <input id="dropzone-file" type='file' className='ml-12 comfortaa-regular' onChange={handleImageUpload} ></input>
    </label>
</div> 
     
      
      
      <button onClick={handleDetectObjects} className='mt-8 bg-[#0F4C75] text-white dark:text-gray-200 w-44 p-4 rounded-full items-center mx-auto comfortaa-regular'>Detect Objects</button>


      {/* <Button onClick={handleDarkMode}>Click me</Button> */}
      {detectedImage && (

        <div className='flex flex-col h-full  '>


         <div className="mx-auto comfortaa-regular mt-12 rounded-2xl text-white  bg-[#3282B8] p-4 flex flex-col"><p>Number of vehicles detected</p>  <div className='mx-auto text-3xl'><CountUp end={vehicleCount} duration={5} /><div/></div></div>

         <div className="flex flex-col lg:flex-row gap-3 mt-12">
        <div className="flex w-full lg:w-1/2 flex-col gap-2">
          <h2 className='mx-auto comfortaa-regular text-red-700 dark:text-red-500 text-xl'>Original Image</h2>
          <div className="p-2 bg-red-700">

          <img src={originalImage} className='w-full ' alt="Detected Objects" />
          </div>

        </div>
        <div className="flex w-full lg:w-1/2 flex-col gap-2">
          
        <h2 className='mx-auto comfortaa-regular text-green-600 dark:text-green-300 text-xl'>Output Image</h2>
        <div className="p-2 bg-green-400">

          <img src={detectedImage} className='w-full' alt="Detected Objects" />
</div>
          </div>
         </div>

        </div>

      )}

    </div>
    </div>


    </Flowbite>
   

  );

}



export default App;