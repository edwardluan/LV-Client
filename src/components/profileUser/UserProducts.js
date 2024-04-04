import React from "react";
import { useSelector } from "react-redux";
import ProductCard from "../ProductCard";

const UserProducts = () => {
  const userProducts = useSelector((state) => state.market.userProducts);
  return (
    <div>
      {userProducts.length > 0 ? (
        <div className="diary_thumb">
          {userProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <h5>Chưa có sản phẩm !</h5>
      )}
    </div>
  );
};

export default UserProducts;
