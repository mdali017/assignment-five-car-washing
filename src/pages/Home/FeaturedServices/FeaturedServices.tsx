import { useGetAllServicesQuery } from "../../../redux/api/api";
import { FaClock, FaDollarSign } from "react-icons/fa";

const FeaturedServices = () => {
  const { data: servicesData = [] } = useGetAllServicesQuery(undefined);

  console.log(servicesData);

  return (
    <div className="bg-gray-100 py-10">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">
          Featured Services
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicesData?.data?.map((service: any) => (
            <div
              key={service._id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {service.name}
              </h3>
              <p className="text-gray-600 mb-4">{service.description}</p>
              <div className="flex justify-between items-center mt-4">
                <div className="flex items-center text-gray-700">
                  <FaDollarSign className="mr-2 text-green-500" />
                  <span className="font-bold text-lg">${service.price}</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <FaClock className="mr-2 text-blue-500" />
                  <span className="text-sm">{service.duration} min</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedServices;
