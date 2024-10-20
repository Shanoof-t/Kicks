import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategorieItems } from "../features/Categorie/categorieAPI";
import {
  setCategorieGender,
  setLoad,
} from "../features/Categorie/categorieSlice";
function Categorie() {
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  const { categorieGender } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    if (categorieGender) {
      dispatch(setCategorieGender(categorieGender));
    }
  }, [dispatch, categorieGender]);

  const items = useSelector((state) => state.categorie.items.data);
  const load = useSelector((state) => state.categorie.load);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(fetchCategorieItems(categorieGender));
  }, [categorieGender, dispatch]);
  
  const handleInitialLoad = () => {
    dispatch(setLoad());
  };
  useEffect(() => {
    navigate(`CASUAL`);
  }, [load, navigate]);

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-8 ">
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
      <Outlet context={{ categorieGender }} />
    </div>
  );
}

export default Categorie;
