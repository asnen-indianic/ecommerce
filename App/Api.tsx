import { useCallback } from "react";

export const getProduct = async (callback:any) => {
   fetch('https://dummyjson.com/products/category/smartphones')
  .then(results => results.json())
  .then(data => {
    console.log("data is ",data)
    callback(data); 
  });  
};

