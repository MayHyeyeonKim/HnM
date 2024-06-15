import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";
import { currencyFormat } from "../utils/number";

const OrderReceipt = ({ cartList, totalPrice, coupons = {} }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedCoupon, setSelectedCoupon] = useState("");
  const [discountAmount, setDiscountAmount] = useState(0);

  useEffect(() => {
    console.log("Coupons received in OrderReceipt:", coupons);
  }, [coupons]);

  const handleCouponChange = (event) => {
    const coupon = event.target.value;
    setSelectedCoupon(coupon);

    // Assuming a fixed discount amount for simplicity
    const discount = 15; // Example: $15 off
    if (coupon) {
      setDiscountAmount(discount);
    } else {
      setDiscountAmount(0);
    }
  };

  const finalPrice = totalPrice - discountAmount;

  return (
    <div className="receipt-container">
      <h3 className="receipt-title">Order List</h3>
      <ul className="receipt-list">
        {cartList.map((item) => (
          <li key={item._id}>
            <div className="display-flex space-between">
              <div>{item.productId.name}</div>
              <div>$ {currencyFormat(item.productId.price * item.qty)}</div>
            </div>
          </li>
        ))}
      </ul>

      <div className="display-flex space-between receipt-title">
        <div>
          <strong>Total:</strong>
        </div>
        <div>
          <strong>$ {currencyFormat(totalPrice)}</strong>
        </div>
      </div>

      {location.pathname.includes("/cart") && cartList.length > 0 && (
        <>
          <Form.Group controlId="couponSelect">
            <Form.Label>Select a Coupon</Form.Label>
            <Form.Control as="select" value={selectedCoupon} onChange={handleCouponChange}>
              <option value="">No coupon</option>
              {Array.isArray(coupons) && coupons.map((coupon) => (
                <option key={coupon} value={coupon}>
                  {coupon}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <div className="display-flex space-between receipt-title">
            <div>
              <strong>Discount:</strong>
            </div>
            <div>
              <strong>$ {currencyFormat(discountAmount)}</strong>
            </div>
          </div>

          <div className="display-flex space-between receipt-title">
            <div>
              <strong>Final Price:</strong>
            </div>
            <div>
              <strong>$ {currencyFormat(finalPrice)}</strong>
            </div>
          </div>

          <Button
            variant="dark"
            className="payment-button"
            onClick={() => navigate("/payment")}
          >
            Proceed to Checkout
          </Button>
        </>
      )}

      {location.pathname.includes("/payment") && (
        <>
          <div className="display-flex space-between receipt-title">
            <div>
              <strong>Discount:</strong>
            </div>
            <div>
              <strong>$ {currencyFormat(discountAmount)}</strong>
            </div>
          </div>

          <div className="display-flex space-between receipt-title">
            <div>
              <strong>Final Price:</strong>
            </div>
            <div>
              <strong>$ {currencyFormat(finalPrice)}</strong>
            </div>
          </div>
        </>
      )}

      <div>
        Possible payment methods will not be confirmed until you reach the payment stage.
        <div>
          Read about the 30-day return period, return fees, and additional shipping charges for undelivered items. 
          Returns and Refunds
        </div>
      </div>
    </div>
  );
};

export default OrderReceipt;
