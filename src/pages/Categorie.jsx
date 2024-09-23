import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
function Categorie() {
  const { categorieGender } = useParams();
  const [items, setItems] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`http://localhost:4000/items?gender=${categorieGender}`)
      .then((res) => {
        setItems(res.data);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  }, [categorieGender]);
  const [load,setLoad]=useState(true)
  const handleInitialLoad = () =>{
    setLoad(!load)
  }
  useEffect(()=>{
    navigate(`CASUAL`)
  },[load,categorieGender])
 
  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-center mb-8">
        <ul className="flex flex-wrap gap-6">
          <li
            onClick={handleInitialLoad}
            className="text-lg font-semibold hover:text-blue-700 transition duration-300"
          >
            Casual
          </li>
          <li
            onClick={() => navigate(`FOOTBALL`)}
            className="text-lg font-semibold hover:text-blue-700 transition duration-300"
          >
            Football
          </li>
          <li
            onClick={() => navigate(`RUNNING`)}
            className="text-lg font-semibold hover:text-blue-700 transition duration-300"
          >
            Running
          </li>
        </ul>
      </div>
      <Outlet context={{categorieGender}} />
    </div>
  );
}

export default Categorie;
