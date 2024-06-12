import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Col, Row } from "react-bootstrap";
import Sidebar from "../component/Sidebar";
import Navbar from "../component/Navbar";
import ToastMessage from "../component/ToastMessage";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../action/userAction";
import { cartActions } from "../action/cartAction";
// import SummerSaleModal from "../component/SummerSaleModal";
import { Button } from 'react-bootstrap';
import DiscountModal from '../component/DiscountModal';

const AppLayout = ({ children }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  // const [showModal, setShowModal] = useState(true);
  useEffect(() => {
    dispatch(userActions.loginWithToken());
  }, []);
  useEffect(() => {
    if (user) {
      dispatch(cartActions.getCartQty());
    }
  }, [user]);
  // const handleCloseModal = () => setShowModal(false);
  const [showModal, setShowModal] = useState(false);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);
  return (
    <div>
      <ToastMessage />
      {/* <SummerSaleModal show={showModal} handleClose={handleCloseModal} />  */}
      <div>
            <button className="fixed-button" onClick={handleShow}>
                Get 15% off
            </button>
            <DiscountModal show={showModal} handleClose={handleClose} />
            
        </div>
      {location.pathname.includes("admin") ? (
        <Row className="vh-100">
          <Col xs={12} md={3} className="sidebar mobile-sidebar">
            <Sidebar />
          </Col>
          <Col xs={12} md={9}>
            {children}
          </Col>
        </Row>
      ) : (
        <>
          <Navbar user={user} />
          {children}
        </>
      )}
    </div>
  );
};

export default AppLayout;
