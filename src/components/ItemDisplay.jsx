import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setCategrieType } from "../features/categorie_details/categorieDetailsSlice";
function ItemDisplay() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.categorieDetails.items.data);
  const type = useSelector((state) => state.categorieDetails.categrieType);
  const gender = useSelector((state) => state.categorie.categorieGender);

  useEffect(() => {
    if (!type && !gender) {
      dispatch(setCategrieType("ALL"));
    }
  }, [type,gender,dispatch]);

  // console.log(items);
  // console.log(type);
  // console.log(gender);

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-8 pt-16">
      <h1 className="text-3xl font-bold mb-4">
        {gender} {type} PRODUCTS
      </h1>
      <h5 className="text-lg mb-8">{items.length} items</h5>

      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((item, index) => (
          <div
            key={`${item.id}${index}`}
            className="border rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <img
              src={item.imageURL}
              alt={`${item.name} image`}
              className="w-full h-60 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{item.name}</h2>
              <Link to={`/product/${item.id}`}>
                <button className="w-full px-4 py-2 text-white bg-thirdColor font-bold rounded hover:bg-hoverColor transition-colors duration-300">
                  VIEW PRODUCT - ${item.price}
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ItemDisplay;
