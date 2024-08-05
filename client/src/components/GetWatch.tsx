"use client";

import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import FilterWatch from "../components/FilterWatch";
import { useDeleteWatchMutation, useGetWatchQuery } from '@/redux/features/WatchApi ';
import { WatchType } from '@/redux/types ';

const GetWatch = () => {
  const { data: watch, isLoading, isError, refetch } = useGetWatchQuery<any>("");
  const [deleteWatch, { isLoading: isDeleting, isError: isDeleteError }] = useDeleteWatchMutation();
  const [filteredList, setFilteredList] = useState<WatchType[]>([]);

  useEffect(() => {
    if (watch) {
      setFilteredList(watch); // Initially, show all watches
    }
  }, []);

  const handleDelete = async (id: any) => {
    try {
      console.log(`Attempting to delete watch with id: ${id}`);
      await deleteWatch(id).unwrap();
      console.log(`Successfully deleted watch with id: ${id}`);
      refetch();
    } catch (error) {
      console.error("Failed to delete the watch:", error);
    }
  };

  const handleFilterUpdate = (filteredData: WatchType[]) => {
    setFilteredList(filteredData);
  };

  if (isError) {
    return <div>Error loading watches.</div>;
  }

  if (isLoading) {
    return <div>...Loading</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <FilterWatch data={watch} onFilterUpdate={handleFilterUpdate} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredList.map((w: WatchType) => (
          <div key={w.id}>
            {/* Watch card display */}
            <div className="flex justify-center items-center bg-gradient-to-br from-purple-300 to-indigo-500 p-4">
              <div className="max-w-md w-full bg-white rounded-xl shadow-2xl overflow-hidden transform transition duration-500 hover:scale-105">
                <div className="relative">
                  <Image
                    className="w-full h-64 object-cover"
                    src={w.images}
                    alt="Nature scene"
                    width={420}
                    height={560}
                  />
                  <div className="absolute top-0 right-0 bg-teal-500 text-white px-2 py-1 m-2 rounded-md text-sm font-semibold">
                    Featured
                  </div>
                </div>
                <div className="p-6">
                  <h2 className="text-2xl font-bold mb-2 text-gray-800">
                    {w.brands}
                  </h2>
                  <p className="text-gray-600 mb-4">
                    {w.description}
                  </p>
                  <div className="flex items-center mb-4">
                    <span className="text-gray-600 ml-1"></span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-gray-800">${w.prices}</span>
                    <div className="flex gap-2">
                      <Link href={`/updateWatch/${w.id}`}>
                        <button className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75 transition duration-300 ease-in-out">
                          <FaEdit />
                        </button>
                      </Link>
                      <button
                        className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75 transition duration-300 ease-in-out"
                        onClick={() => handleDelete(w.id)}
                        disabled={isDeleting}
                      >
                        {isDeleting ? 'Deleting...' : <MdDelete />}
                      </button>
                      {isDeleteError && <p>Error deleting watch.</p>}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GetWatch;
