import React, { useState } from "react";

import { useGetAllServicesQuery } from "../../redux/api/api";

const ServicesPage: React.FC = () => {
  const {
    data: services = [],
    isLoading,
    error,
  } = useGetAllServicesQuery(undefined);

  const [searchQuery, setSearchQuery] = useState("");
  const [filterByPrice, setFilterByPrice] = useState("");
  const [sortOption, setSortOption] = useState("");

  const filteredServices = services?.data
    ?.filter((service: any) =>
      service.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((service: any) =>
      filterByPrice ? service.price <= parseFloat(filterByPrice) : true
    )
    .sort((a: any, b: any) => {
      if (sortOption === "price-asc") return a.price - b.price;
      if (sortOption === "price-desc") return b.price - a.price;
      if (sortOption === "duration-asc")
        return parseInt(a.duration) - parseInt(b.duration);
      if (sortOption === "duration-desc")
        return parseInt(b.duration) - parseInt(a.duration);
      return 0;
    });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading services.</div>;

  return (
    <div className="p-4 container mx-auto">
      <h1 className="text-5xl font-bold mb-4 text-center my-10">
        Our Services
      </h1>
      <div className="flex justify-between gap-4 mb-4">
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Search services..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border rounded p-2 border-blue-700"
          />
          <input
            type="number"
            placeholder="Filter by max price"
            value={filterByPrice}
            onChange={(e) => setFilterByPrice(e.target.value)}
            className="border rounded p-2 "
          />
        </div>

        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="border rounded p-2"
        >
          <option value="">Sort By</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="duration-asc">Duration: Short to Long</option>
          <option value="duration-desc">Duration: Long to Short</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredServices.map((service: any) => (
          <div key={service._id} className="border p-4 rounded shadow-sm">
            <h2 className="text-xl font-semibold">{service.name}</h2>
            <p>{service.description}</p>
            <p>Price: ${service.price}</p>
            <p>Duration: {service.duration} mins</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesPage;
