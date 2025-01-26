import React from "react";
import { Link } from "react-router-dom";
import { useGetAllServicesQuery } from "../../../redux/api/api";
import { FaClock, FaDollarSign } from "react-icons/fa";

const FeaturedServices: React.FC = () => {
  const { data: servicesData = [] } = useGetAllServicesQuery(undefined);

  return (
    <div className="bg-gray-100 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Featured Services
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {servicesData?.data
            ?.slice(0, 8)
            ?.map((service: any, index: number) => (
              <Link
                key={index}
                to={`/services/${service._id}`}
                state={{ service }}
              >
                <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:-translate-y-2">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="font-bold text-xl mb-2">{service.name}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {service.description ||
                        "Experience our premium car wash service"}
                    </p>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2 text-violet-600">
                        <FaDollarSign />
                        <span>{service.price}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-500">
                        <FaClock />
                        <span>{service.duration} mins</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedServices;
