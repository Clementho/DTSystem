import React from "react";
import { useParams } from "react-router-dom";
import products from "../../../data/products.json";

const ProductDetails = () => {
  const { id } = useParams();

  const product = products.find((product) => product.id === parseInt(id));
  const { prodID, productName, collectionName, productPrice } = product;

  //TODO: Clean this up when making the backend
  const imageDir = `/resources/asset-${id}.jpg`;

  return (
    <>
      <img src={imageDir} />
    </>
  );
};

export default ProductDetails;
