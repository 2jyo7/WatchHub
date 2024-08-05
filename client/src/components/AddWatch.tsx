"use client"
import { useCreateWatchMutation } from '@/redux/features/WatchApi ';
import React, { ReactHTMLElement, useState } from 'react';

const AddWatch = () => {
    const [ images, setImages ] = useState("");
    const [ prices, setPrices ] = useState("");
    const [ brands, setBrands ] = useState("");
    const [ description, setDescription ] = useState("");
    const [addWatch] = useCreateWatchMutation();

    const handleAddWatch = (e: any) => {
      e.preventDefault();
      addWatch({images, prices, brands, description}).then(() => {
          setImages("")
          setDescription("");
          setPrices("");
          setBrands("");
      }).catch((err) => {console.log(err, "Watch failed to add.");
      });
      
    }
 
   return (
<div className="bg-purple-600 min-h-screen flex justify-center items-center ">
  <form action="" className="w-full max-w-lg p-8 mx-4 bg-purple-700 rounded-lg shadow-lg">
    <h1 className="text-2xl font-medium text-center mb-6 text-white">ADD THE WATCHES</h1>
    <div className="mb-4">
      <label htmlFor="images" className="block text-purple-200 mb-1">Images</label>
      <input
        type="text"
        id="images"
        placeholder="Paste Images URL"
        className="w-full p-3 bg-transparent border border-purple-500 rounded outline-none placeholder-purple-300 text-white"
        value={images}
        onChange={(e) => setImages(e.target.value)}
      />
    </div>
    <div className="mb-4">
      <label htmlFor="prices" className="block text-purple-200 mb-1">Prices</label>
      <input
        type="text"
        id="prices"
        placeholder="Enter the 💲"
        className="w-full p-3 bg-transparent border border-purple-500 rounded outline-none placeholder-purple-300 text-white"
        value={prices}
        onChange={(e) => setPrices(e.target.value)}
      />
    </div>
    <div className="mb-4">
      <label htmlFor="brands" className="block text-purple-200 mb-1">Brands</label>
      <input
        type="text"
        id="brands"
        placeholder="Name the Brand"
        className="w-full p-3 bg-transparent border border-purple-500 rounded outline-none placeholder-purple-300 text-white"
        value={brands}
        onChange={(e) => setBrands(e.target.value)}
      />
    </div>
    <div className="mb-6">
      <label htmlFor="description" className="block text-purple-200 mb-1">Description</label>
      <input
        type="text"
        id="description"
        placeholder="Enter the Description"
        className="w-full p-3 bg-transparent border border-purple-500 rounded outline-none placeholder-purple-300 text-white"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
    </div>
    <button type="button" className="w-full py-3 bg-pink-600 rounded text-white font-bold" onClick={handleAddWatch}>
      Submit
    </button>
  </form>
</div>


  )
}

export default AddWatch