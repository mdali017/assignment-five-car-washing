import React, { useState } from "react";

import { useGetAllServicesQuery } from "../../redux/api/api";
import { Link } from "react-router-dom";

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
      <div className="p-4 bg-white shadow rounded-lg flex flex-col sm:flex-row justify-between gap-4 mb-4">
        {/* Search and Filter Inputs */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border rounded w-full pl-10 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-5 h-5 absolute top-2.5 left-3 text-gray-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11 19a8 8 0 100-16 8 8 0 000 16zM21 21l-4.35-4.35"
              />
            </svg>
          </div>

          <div>
            <input
              type="number"
              placeholder="Filter by max price"
              value={filterByPrice}
              onChange={(e) => setFilterByPrice(e.target.value)}
              className="border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
        </div>

        {/* Sort Dropdown */}
        <div>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            <option value="">Sort By</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="duration-asc">Duration: Short to Long</option>
            <option value="duration-desc">Duration: Long to Short</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-10">
        {filteredServices.map((service: any) => (
          <Link to={`/services/${service._id}`} key={service._id}>
            <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform transform hover:-translate-y-2 hover:shadow-lg">
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {service.name}
                </h2>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {service.description}
                </p>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-lg font-bold text-blue-600">
                    ${service.price}
                  </span>
                  <span className="text-sm text-gray-500">
                    {service.duration} mins
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ServicesPage;
