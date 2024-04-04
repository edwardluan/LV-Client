import React from "react";
import { useSelector } from "react-redux";
import ProductCard from "../ProductCard";

const Products = () => {
  const market = useSelector((state) => state.market);

  return (
    <div className="market">
      {market.products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};

export default Products;
