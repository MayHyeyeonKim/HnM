import React from "react";
import { useNavigate } from "react-router-dom";
import { currencyFormat } from "../utils/number";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const showProduct = (id) => {
    console.log("id:", id); // id를 함수 내부에서 로그로 확인
    navigate(`/product/${id}`);
  };

  return (
    <div className="card" onClick={() => showProduct(product._id)}>
      <img src={product.image} alt={product.name} />
      <div>{product.name}</div>
      <div>{currencyFormat(product.price)}</div>
    </div>
  );
};

export default ProductCard;
