import React from "react";
import logo from "../../assets/logo.png";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-400 to-purple-600 text-white">
      <div className="container mx-auto py-12 px-4">
        {/* Top Section */}
        <div className="flex flex-col lg:flex-row lg:justify-between items-center lg:items-start gap-8">
          {/* Logo Section */}
          <div className="text-center lg:text-left">
            <img src={logo} alt="Logo" className="w-40 mx-auto lg:mx-0" />
            <p className="mt-4 text-sm">
              Elevate your business with our cutting-edge solutions.
            </p>
          </div>
          
          {/* Navigation Links */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8 text-sm">
            <div>
              <h3 className="uppercase font-bold mb-4">Product</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:underline">Features</a></li>
                <li><a href="#" className="hover:underline">Integrations</a></li>
                <li><a href="#" className="hover:underline">Pricing</a></li>
                <li><a href="#" className="hover:underline">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h3 className="uppercase font-bold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:underline">Privacy</a></li>
                <li><a href="#" className="hover:underline">Terms of Service</a></li>
              </ul>
            </div>
            <div>
              <h3 className="uppercase font-bold mb-4">Developers</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:underline">Public API</a></li>
                <li><a href="#" className="hover:underline">Documentation</a></li>
                <li><a href="#" className="hover:underline">Guides</a></li>
              </ul>
            </div>
            <div>
              <h3 className="uppercase font-bold mb-4">Social Media</h3>
              <div className="flex space-x-4">
                <a
                  href="#"
                  title="Facebook"
                  className="p-2 bg-white rounded-full text-blue-600 hover:bg-blue-600 hover:text-white transition"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .732.593 1.324 1.325 1.324h11.494v-9.294h-3.125v-3.622h3.125v-2.671c0-3.066 1.875-4.738 4.614-4.738 1.313 0 2.444.097 2.77.141v3.213l-1.899.001c-1.487 0-1.777.707-1.777 1.746v2.309h3.555l-.464 3.622h-3.091v9.294h6.075c.729 0 1.325-.592 1.325-1.324v-21.351c0-.732-.596-1.325-1.325-1.325z"/>
                  </svg>
                </a>
                <a
                  href="#"
                  title="Twitter"
                  className="p-2 bg-white rounded-full text-blue-400 hover:bg-blue-400 hover:text-white transition"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.46 6.011c-.77.346-1.59.577-2.44.682.878-.524 1.551-1.35 1.872-2.335-.823.488-1.734.843-2.7 1.033-.776-.827-1.877-1.343-3.1-1.343-2.354 0-4.267 1.913-4.267 4.267 0 .334.038.66.111.973-3.548-.178-6.694-1.876-8.8-4.462-.368.633-.579 1.37-.579 2.154 0 1.486.756 2.797 1.905 3.565-.703-.021-1.364-.216-1.94-.538v.054c0 2.077 1.477 3.81 3.438 4.204-.359.099-.737.152-1.128.152-.275 0-.544-.026-.806-.077.545 1.703 2.125 2.941 3.998 2.975-1.467 1.15-3.319 1.835-5.334 1.835-.346 0-.688-.02-1.029-.06 1.902 1.219 4.162 1.932 6.592 1.932 7.911 0 12.234-6.554 12.234-12.234 0-.187-.004-.374-.013-.561.838-.606 1.563-1.363 2.14-2.227z"/>
                  </svg>
                </a>
                <a
                  href="#"
                  title="Instagram"
                  className="p-2 bg-white rounded-full text-pink-600 hover:bg-pink-600 hover:text-white transition"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.206.056 2.042.248 2.545.415.613.2 1.063.443 1.53.92.468.468.721.919.92 1.53.167.504.359 1.34.415 2.545.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.056 1.206-.248 2.042-.415 2.545-.2.613-.443 1.063-.92 1.53-.468.468-.919.721-1.53.92-.504.167-1.34.359-2.545.415-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.206-.056-2.042-.248-2.545-.415-.613-.2-1.063-.443-1.53-.92-.468-.468-.721-.919-.92-1.53-.167-.504-.359-1.34-.415-2.545-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.056-1.206.248-2.042.415-2.545.2-.613.443-1.063.92-1.53.468-.468.919-.721 1.53-.92.504-.167 1.34-.359 2.545-.415 1.266-.058 1.646-.07 4.85-.07m0-2.163c-3.259 0-3.67.013-4.947.072-1.243.057-2.122.258-2.864.548a6.26 6.26 0 00-2.274 1.5 6.26 6.26 0 00-1.5 2.274c-.29.742-.491 1.621-.548 2.864-.059 1.276-.072 1.688-.072 4.947s.013 3.67.072 4.947c.057 1.243.258 2.122.548 2.864a6.26 6.26 0 001.5 2.274 6.26 6.26 0 002.274 1.5c.742.29 1.621.491 2.864.548 1.276.059 1.688.072 4.947.072s3.67-.013 4.947-.072c1.243-.057 2.122-.258 2.864-.548a6.26 6.26 0 002.274-1.5 6.26 6.26 0 001.5-2.274c.29-.742.491-1.621.548-2.864.059-1.276.072-1.688.072-4.947s-.013-3.67-.072-4.947c-.057-1.243-.258-2.122-.548-2.864a6.26 6.26 0 00-1.5-2.274 6.26 6.26 0 00-2.274-1.5c-.742-.29-1.621-.491-2.864-.548-1.276-.059-1.688-.072-4.947-.072zM12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 100-12.324zm0 10.162a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
        <hr className="my-8 border-t border-gray-200 opacity-50" />
        <div className="text-center text-sm">
          <p>
            © {new Date().getFullYear()} YourCompany. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
