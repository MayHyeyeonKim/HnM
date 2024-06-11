import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';

const SummerSaleModal = () => {
    const [show, setShow] = useState(true); // 컴포넌트가 마운트될 때 모달을 보여주기 위해 true로 설정

    const handleClose = () => setShow(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShow(true); // 페이지 로드 후 모달 표시
        }, 1000); // 1초 후에 모달을 표시하도록 설정

        return () => clearTimeout(timer); // 컴포넌트가 언마운트될 때 타이머를 클리어
    }, []);

    return (
        <>
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Summer Sale Event</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>Big Summer Sale!</h4>
                    <p>Get up to 50% off on selected items!</p>
                    <p>Don't miss out on our exclusive summer discounts.</p>
                    <p>Sale ends on August 31st.</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default SummerSaleModal;
