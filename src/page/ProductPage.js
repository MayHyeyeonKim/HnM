import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';
import { ClipLoader } from 'react-spinners';
import { productActions } from '../action/productAction';
import ProductCard from "../component/ProductCard";

const ProductPage = ({ category }) => {
    const dispatch = useDispatch();
    const { productList, loading, error } = useSelector((state) => state.product);

    useEffect(() => {
        dispatch(productActions.getProductList({ category }));
    }, [category, dispatch]);

    // useEffect(() => {
    //     console.log("Products state updated:", productList);
    // }, [productList]);

    return (
        <>
            {loading ? (
                <div className="loading">
                    <ClipLoader color="#FB6D33" loading={loading} size={100} />
                </div>
            ) : (
                <Container>
                    <Row>
                        {productList.length > 0 ? (
                            productList.map((product) => (
                                <Col md={3} sm={12} key={product._id}>
                                    <ProductCard product={product} />
                                </Col>
                            ))
                        ) : (
                            <div className="text-align-center empty-bag">
                                <h2>No products found in {category}.</h2>
                            </div>
                        )}
                    </Row>
                </Container>
            )}
            {error && <div>Error: {error}</div>}
        </>
    );
};

export default ProductPage;
