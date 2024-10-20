import React from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import ItemDisplay from "../components/ItemDisplay";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategorieItems } from "../features/categorie_details/categorieDetailsAPI";
import { setCategrieType } from "../features/categorie_details/categorieDetailsSlice";

function CategorieDetails() {
  const { categrieType } = useParams();
  const dispatch = useDispatch();
  const categorieGender = useSelector(
    (state) => state.categorie.categorieGender
  );

  useEffect(() => {
    if (categrieType) {
      dispatch(setCategrieType(categrieType));
    }
  }, [dispatch, categrieType]);

  useEffect(() => {
    if (categrieType && categorieGender) {
      dispatch(fetchCategorieItems({ categrieType, categorieGender }));
    }
  }, [categrieType, categorieGender]);

  return <ItemDisplay />;
}
export default CategorieDetails;
