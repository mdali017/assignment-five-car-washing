const OurSpeciality = () => {
  return (
    <div>
      <div className="container mx-auto my-12">
        <div className="grid md:grid-cols-2 gap-8 bg-white shadow-lg rounded-lg p-6">
          <div>
            <h1 className="text-blue-700 text-3xl font-bold mb-4 whitespace-nowrap ">
              Patheon® and the Power of POS Car Wash Software Scalability
            </h1>
            <p className="text-gray-700 mb-4">
              Car wash POS system scalability is vital to owners and investors.
              Increased competition, technological evolution, and rising
              customer expectations require a solution to help you navigate
              these challenges.
            </p>
            <p className="text-gray-700 mb-4">
              Enter Patheon, the POS solution that’s so much more. Beyond
              handling unlimited plans and payments, Patheon:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
              <li>Unlocks insights</li>
              <li>Influences actions</li>
              <li>Optimizes your business</li>
              <li>Elevates the user experience</li>
            </ul>
            <p className="text-gray-700 mb-6">
              By addressing what you value as a business owner, Patheon
              transforms your operations and changes how employees and customers
              feel about your brand.
            </p>
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded font-bold">
              Peek at Patheon
            </button>
          </div>

          <div className="mt-12">
            <img
              src="https://drb.com/getmedia/e6168879-a1f9-4b43-ad79-0e4afda12bcd/pos_car_wash_software_scalability.png"
              alt="Car Wash"
              className="rounded-lg shadow"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurSpeciality;
