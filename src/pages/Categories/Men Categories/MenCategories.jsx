import { Link, Outlet } from "react-router-dom";
import { useEffect } from "react";
function MenCategories() {
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page
  }, []);
  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-wrap items-center justify-center mb-8 space-x-4">
        {/* Menu Items */}
        <ul className="flex flex-wrap space-x-4 md:space-x-6">
          <li>
            <Link
              to="/men"
              className="text-lg md:text-xl font-semibold text-gray-800 hover:text-blue-700 transition-colors duration-300"
            >
              Casual
            </Link>
          </li>
          <li>
            <Link
              to="/men/football"
              className="text-lg md:text-xl font-semibold text-gray-800 hover:text-blue-700 transition-colors duration-300"
            >
              Football
            </Link>
          </li>
          <li>
            <Link
              to="/men/running"
              className="text-lg md:text-xl font-semibold text-gray-800 hover:text-blue-700 transition-colors duration-300"
            >
              Running
            </Link>
          </li>
        </ul>
      </div>
      <Outlet />
    </div>
  );
}

export default MenCategories;
