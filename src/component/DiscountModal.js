import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import '../discountModal.style.css';
import { useNavigate } from 'react-router';

const DiscountModal = ({ show, handleClose }) => {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        navigate(`/register?email=${encodeURIComponent(email)}`);
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose} centered size="xl">
            <div className="modal-close-button" onClick={handleClose}>
                &times;
            </div>
            <Modal.Body className="discount-modal-body">
                <Row>
                    <Col md={6} className="p-0">
                        <img 
                            src="https://res.cloudinary.com/db83rk1et/image/upload/v1718020189/kliedewhjfxlmtesmmwo.jpg"
                            alt="Discount"
                            className="img-fluid"
                        />
                    </Col>
                    <Col md={6} className="p-4">
                        <h2 className="text-danger">Get 15% off your order</h2>
                        <p>Sign up to receive emails and texts and get first dibs on deals, new arrivals, special events and more!</p>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="preference">
                                <Form.Label>Select your preference</Form.Label>
                                <div>
                                    <Form.Check 
                                        type="radio" 
                                        label="Women" 
                                        name="preference" 
                                        id="women" 
                                    />
                                    <Form.Check 
                                        type="radio" 
                                        label="Men" 
                                        name="preference" 
                                        id="men" 
                                    />
                                    <Form.Check 
                                        type="radio" 
                                        label="Kids / Baby" 
                                        name="preference" 
                                        id="kids-baby" 
                                    />
                                    <Form.Check 
                                        type="radio" 
                                        label="Home" 
                                        name="preference" 
                                        id="home" 
                                    />
                                </div>
                            </Form.Group>
                            <Form.Group controlId="email" className="form-row">
                                <Form.Control 
                                    type="email" 
                                    placeholder="Enter your email" 
                                    value={email}
                                    onChange={handleEmailChange}
                                    required
                                />
                            </Form.Group>
                            <Button variant="dark" type="submit">
                                Continue
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Modal.Body>
        </Modal>
    );
};

export default DiscountModal;
