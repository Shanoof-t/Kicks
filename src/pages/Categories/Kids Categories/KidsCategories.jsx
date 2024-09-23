import { useEffect } from "react";
import { Link, Outlet } from "react-router-dom";

function KidsCategories() {
  useEffect(()=>{
    window.scrollTo(0,0)
  },[])
  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-center mb-8">
        <ul className="flex flex-wrap gap-6">
          <li>
            <Link to="/kids" className="text-lg font-semibold hover:text-blue-700 transition duration-300">
              Casual
            </Link>
          </li>
          <li>
            <Link to="/kids/football" className="text-lg font-semibold hover:text-blue-700 transition duration-300">
              Football
            </Link>
          </li>
          <li>
            <Link to="/kids/running" className="text-lg font-semibold hover:text-blue-700 transition duration-300">
              Running
            </Link>
          </li>
        </ul>
      </div>
      <Outlet />
    </div>
  );
}

export default KidsCategories;
