import { createContext, useEffect, useState } from 'react'
import { itemsURL } from '../utils/API_URL'; 
import axios from 'axios';
export const ProductContext = createContext()
function ProductProvider({children}) {
    const [allitems,setAllItems]=useState([])
    useEffect(() => {
        axios
          .get(itemsURL)
          .then((res) => {
            setAllItems(res.data);
          })
          .catch((err) => console.log(err.message));
      }, []);
  return (
    <ProductContext.Provider value={{allitems}}>
      {children}
    </ProductContext.Provider>
  )
}

export default ProductProvider