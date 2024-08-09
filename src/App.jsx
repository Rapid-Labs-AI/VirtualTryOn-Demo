import { useState } from 'react';
import './App.css';
import demo from './assets/images/step1.png';
import demoStep2 from './assets/images/step2.png';
import tryon from './assets/icon/tryon.png';
import axios from 'axios';

function App() {
  const [step, setStep] = useState(1);
  const [personFile, setPersonFile] = useState(null);
  const [clothingFile, setClothingFile] = useState(null);
  const [generatedImage, setGeneratedImage] = useState(null);

  const handleFileChange = (event, type) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      if (type === 'person') {
        setPersonFile(selectedFile);
      } else {
        setClothingFile(selectedFile);
      }
    }
  };

  const handleNext = () => {
    if (step === 1 && personFile) {
      setStep(2);
    } else if (step === 2 && clothingFile) {
      submitFiles();
      setStep(3);
    }
  };

  const handlePrevious = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const submitFiles = async () => {
    const formData = new FormData();
    formData.append('person', personFile);
    formData.append('clothing', clothingFile);

    try {
      const response = await axios.post('http://9185-34-16-152-134.ngrok-free.app/submit-prompt', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response);
      setGeneratedImage(response.data.generated_image);
    } catch (error) {
      alert("Unexpected Error Occurred. Please Refresh the Page and Try Again.")
      console.error('Error submitting files:', error);
    }
  };

  return (
    <>
      <div className="application_container">
        <div className="navbar bg-slate-900 text-white p-4">
          <h2 className='uppercase text-4xl'>Virtual Try On</h2>
        </div>
        <div className="main_section">
          <div className="text-sm mb-10 font-medium text-center text-gray-500  dark:text-gray-400 mx-12">
            {/* Step indicators */}
            <ul className="flex flex-wrap justify-between">
              <li className={step === 1 ? 'basis-1/3 px-2' : 'basis-1/3 px-2 opacity-50 '}>
                <button className="inline-block p-4 w-full border-b-4 border-slate-900 hover:text-gray-600 dark:hover:text-gray-300" disabled>Upload Your Picture</button>
              </li>
              <li className={step === 2 ? 'px-2 basis-1/3' : 'basis-1/3 px-2 opacity-50'}>
                <button className="inline-block w-full p-4 border-b-4 border-slate-900 hover:text-gray-600 dark:hover:text-gray-300" disabled>Upload Your Wardrobe</button>
              </li>
              <li className={step === 3 ? 'px-2 basis-1/3' : 'basis-1/3 px-2 opacity-50'}>
                <button className="inline-block w-full p-4 border-b-4 border-slate-900 hover:text-gray-600 dark:hover:text-gray-300" disabled>See Result</button>
              </li>
            </ul>
          </div>

          <div className="tabs_content text-black">
            {step === 1 && (
              <div className="step1_main_container">
                <div className="nextBtn mx-24 flex justify-end">
                  <button onClick={handleNext} className="w-auto bg-slate-700 hover:bg-slate-600 text-white font-semibold py-4 text-xl px-12 rounded" disabled={!personFile}>
                    Next <span className='text-2xl ml-1'>&rarr;</span>
                  </button>
                </div>
                <div className='step1_container flex flex-wrap justify-center items-center mx-24 '>
                  <div className="flex items-center justify-center w-full basis-2/3 p-16">
                    <label htmlFor="dropzone_file_1" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                        </svg>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Upload your picture</span> or drag and drop</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG</p>
                      </div>
                      <input id="dropzone_file_1" type="file" name='person' className="hidden" required onChange={(e) => handleFileChange(e, 'person')} />
                    </label>
                  </div>
                  <div className="pic_demo basis-1/4">
                    <div className="label mb-2">
                      <h3 className='font-semibold text-lg'>Upload picture like this:</h3>
                    </div>
                    <div className="img">
                      <img src={demo} alt="Demo Step 1" className='max-w-full h-auto' />
                    </div>
                  </div>
                </div>
              </div>
            )}
            {step === 2 && (
              <div className="step2_main_container">
                <div className="tryonBtn mx-24 flex justify-between">
                  <button onClick={handlePrevious} className="w-auto bg-slate-700 hover:bg-slate-600 text-white font-semibold py-4 text-xl px-12 rounded">Previous <span className='text-2xl ml-1'>&larr;</span></button>
                  <button onClick={handleNext} className="w-auto bg-slate-700 hover:bg-slate-600 text-white font-semibold py-4 text-xl flex gap-3 px-6 items-center rounded" disabled={!clothingFile}>
                    <img src={tryon} alt="Try On" className='h-7 mt-1'/> <span>Try On</span>
                  </button>
                </div>
                <div className='step2_container flex flex-wrap justify-center items-center mx-24 '>
                  <div className="flex items-center justify-center w-full basis-2/3 p-16">
                    <label htmlFor="dropzone_file_2" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                        </svg>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Upload your wardrobe</span> or drag and drop</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG</p>
                      </div>
                      <input id="dropzone_file_2" type="file" name='clothing' className="hidden" onChange={(e) => handleFileChange(e, 'clothing')} />
                    </label>
                  </div>
                  <div className="pic_demo basis-1/4">
                    <div className="label mb-2">
                      <h3 className='font-semibold text-lg'>Upload wardrobe like this:</h3>
                    </div>
                    <div className="img">
                      <img src={demoStep2} alt="Demo Step 2" className='max-w-full h-auto' />
                    </div>
                  </div>
                </div>
              </div>
            )}
            {step === 3 && (
              <div className="output_img flex justify-center items-center">
                {generatedImage ? <img src={generatedImage} alt="Output" className='max-w-sm h-auto' /> : <p>Generating Image ... </p>}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
