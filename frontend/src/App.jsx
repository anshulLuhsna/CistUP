import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { DarkThemeToggle, Flowbite } from 'flowbite-react';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMugHot, faSearch } from '@fortawesome/free-solid-svg-icons';
import "./App.css"
import CountUp from 'react-countup'


function App() {

  const [selectedImage, setSelectedImage] = useState(null);

  const [detectedImage, setDetectedImage] = useState(null);
  const [originalImage, setOriginalImage] = useState(null);

  const [vehicleCount, setVehicleCount] = useState(0);

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

      const response = await axios.post('http://localhost:5000/detect', formData);
      setOriginalImage(`data:image/jpeg;base64,${response.data.original_image_base64}`);
      setDetectedImage(`data:image/jpeg;base64,${response.data.detected_image_base64}`);
      setVehicleCount(response.data.vehicle_count)
    } catch (error) {

      console.error('Error:', error);

    }

  };



  return (
    <Flowbite>

    <div className='bg-white dark:bg-black text-black dark:text-white h-100% ' >

    <nav className="bg-white border-gray-200 dark:bg-gray-900">

  

  <div className=" flex flex-wrap items-center  justify-between py-4 px-12  ">
    <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse ml-8">
    <FontAwesomeIcon className='inline' icon={faSearch} />
       
        <span className="self-center text-3xl font-semibold whitespace-nowrap luckiest-guy-regular   dark:text-white">Object Detector</span>
    </a>
    <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
        <span className="sr-only ">Open main menu</span>
        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
        </svg>
    </button>
    <div className="hidden w-full md:block md:w-auto" id="navbar-default">
      <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
        <li>
          <a href="#" className="block my-2 h-4 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500" aria-current="page">Home</a>
        </li>
        <li>
          <a href="#" className="block my-2  py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">About</a>
        </li>
        
        
        <li>
          {/* <a href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Contact</a> */}
    <DarkThemeToggle />
        </li>
      </ul>
    </div>
  </div>
</nav>
   
    <div className="py-12 px-20 h-[120vh]  flex flex-col ">
    <div class="flex items-center justify-center w-full">
    <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
        <div class="flex flex-col items-center justify-center pt-5 pb-6">
            <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
            </svg>
            <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
            <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
        </div>
        <input id="dropzone-file" type='file' className='ml-12' onChange={handleImageUpload} ></input>
    </label>
</div> 
     
      
      
      <button onClick={handleDetectObjects} className='mt-8 bg-green-500 w-1/6 p-2 rounded-full items-center mx-auto'>Detect Objects</button>

      {/* <Button onClick={handleDarkMode}>Click me</Button> */}
      {detectedImage && (

        <div className='flex flex-col h-full  '>


         <div className="mx-auto mt-8 bg-slate-600 p-4 flex flex-col"><p>Number of vehicles detected</p>  <div className='mx-auto text-3xl'><CountUp end={vehicleCount} duration={5} /><div/></div></div>

         <div className="flex gap-3 mt-12">
        <div className="flex w-1/2 flex-col gap-2">
          <h2 className='mx-auto'>Original Image</h2>
          <img src={originalImage} className='w-full' alt="Detected Objects" />

        </div>
        <div className="flex w-1/2 flex-col gap-2">
        <h2 className='mx-auto'>Output Image</h2>

          <img src={detectedImage} className='w-full' alt="Detected Objects" />
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