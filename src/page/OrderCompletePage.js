import React from "react";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "../style/paymentPage.style.css";

const OrderCompletePage = () => {
  const {orderNum} =useSelector((state)=> state.order);
  if (orderNum ==="") {
    return (
      <Container className="confirmation-page">
        <h1>주문 실패</h1>
        <div>
          메인페이지로 돌아가세요
          <Link to="/"> 메인페이지로 돌아가기</Link>
        </div>
      </Container>
    );
  }
  return (
    <Container className="confirmation-page">
      <img
        src="/image/greenCheck.png"
        width={100}
        className="check-image"
        alt="greenCheck.png"
      />
      <h2>Your order has been completed!</h2>
      <div>Order Number: {orderNum}</div>
      <div>
      Please check the "My Order" menu to confirm your order.
        <div className="text-align-center">
          <Link to={"/account/purchase"}>Go to My Order</Link>
        </div>
      </div>
    </Container>
  );
};

export default OrderCompletePage;
