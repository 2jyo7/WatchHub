import { WatchType } from '@/redux/types ';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';


interface FilterWatchProps {
  data: WatchType[];
  onFilterUpdate: (filteredData: WatchType[]) => void;
}

const FilterWatch = ({ data, onFilterUpdate }: FilterWatchProps) => {
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    const filteredData = data.filter((d) => d.brands.toLowerCase().includes(searchInput.toLowerCase()));
    onFilterUpdate(filteredData);
  }, []);

  return (
    <div className="flex flex-col md:flex-cols-2 lg:flex-cols-3 gap-6 mb-4">
      <input
        type="text"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        placeholder="Search by brand..."
        className="text-black px-4 py-2 border rounded-lg"
      />
    </div>
  );
}

export default FilterWatch;
