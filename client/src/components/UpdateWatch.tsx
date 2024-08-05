"use client"
import { useGetWatchByIdQuery, useUpdateWatchMutation } from '@/redux/features/WatchApi ';
import { WatchType } from '@/redux/types ';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const UpdateWatch = ({ id }: any) => {
    const router = useRouter();
    const { data, isLoading, isError } = useGetWatchByIdQuery<any>(id);
    const [UpdatingWatch] = useUpdateWatchMutation<WatchType>();
    const [watch, setWatch] = useState({
        id: 0,
        images: "",
        prices: "",
        brands: "",
        description: "",
    });

    useEffect(() => {
        if (data) {
            console.log('Fetched data:', data[0]); // Log the fetched data
            setWatch({
                id: data[0].id || 0,
                images: data[0].images || "",
                prices: data[0].prices || "",
                brands: data[0].brands || "",
                description: data[0].description || "",
            });
        }
    }, [data]); // Ensure the effect runs when data changes

    // console.log('Watch state:', watch); // Log the watch state

    const handleUpdate = (e: any) => {
        e.preventDefault();
        UpdatingWatch(watch);
        setWatch({
            id,
            images: "",
            prices: "",
            brands: "",
            description: "",
        });
        router.push("/")
    };

    const handleChange = (e: any) => {
        e.preventDefault();
        const { name, value } = e.target;
        setWatch(prev => ({
            ...prev,
            [name]: value
        }));
    };

    if (isLoading) return <h1>...Loading</h1>;
    if (isError) return <h1>Error occurred while fetching data</h1>;

    return (
<div className="bg-purple-600 min-h-screen flex justify-center items-center ">
  <form action="" className="w-full max-w-lg p-8 mx-4 bg-purple-700 rounded-lg shadow-lg">
    <h1 className="text-2xl font-medium text-center mb-6 text-white">Update The WATCHES</h1>
    <div className="mb-4">
      <div className="flex items-center bg-purple-800 rounded-t-lg border-b border-purple-600 mb-2">
        <label htmlFor="images" className="w-20 text-right p-4 text-purple-200">
          Images
        </label>
        <input
          type="text"
          id="images"
          name="images"
          placeholder="Paste Images URL"
          className="flex-1 p-4 bg-transparent placeholder-purple-300 outline-none text-white"
          value={watch.images}
          onChange={handleChange}
        />
      </div>
      <div className="flex items-center bg-purple-800 border-b border-purple-600 mb-2">
        <label htmlFor="prices" className="w-20 text-right p-4 text-purple-200">
          Prices
        </label>
        <input
          type="text"
          id="prices"
          name="prices"
          placeholder="Enter the 💲"
          className="flex-1 p-4 bg-transparent placeholder-purple-300 outline-none text-white"
          value={watch.prices}
          onChange={handleChange}
        />
      </div>
      <div className="flex items-center bg-purple-800 border-b border-purple-600 mb-2">
        <label htmlFor="brands" className="w-20 text-right p-4 text-purple-200">
          Brands
        </label>
        <input
          type="text"
          id="brands"
          name="brands"
          placeholder="Name the Brand"
          className="flex-1 p-4 bg-transparent placeholder-purple-300 outline-none text-white"
          value={watch.brands}
          onChange={handleChange}
        />
      </div>
      <div className="flex items-center bg-purple-800 rounded-b-lg border-b border-purple-600 mb-10">
        <label htmlFor="description" className="w-20 text-right p-4 mx-2 text-purple-200">
          Description
        </label>
        <input
          type="text"
          id="description"
          name="description"
          placeholder="Enter the Description"
          value={watch.description}
          className="flex-1 p-4 bg-transparent placeholder-purple-300 outline-none text-white"
          onChange={handleChange}
        />
      </div>
    </div>
    <button
      type="button" // Ensure the button is type="button" to prevent form submission for now
      className="bg-pink-600 w-full rounded py-4 text-white font-bold shadow"
      onClick={handleUpdate}
    >
      Update
    </button>
  </form>
</div>


    );
}

export default UpdateWatch;
