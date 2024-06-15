import React, { useEffect, useState } from "react";
import ProductCard from "../component/ProductCard";
import { Row, Col, Container } from "react-bootstrap";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { productActions } from "../action/productAction";
import ClipLoader from "react-spinners/ClipLoader";
import SearchBox from '../component/SearchBox';

const ProductAll = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.user.loading);
  const { productList, totalPageNum } = useSelector((state) => state.product);
  const [query, setQuery] = useSearchParams();
  const name = query.get("name");

  return (
    <>
      {
        loading ?
          (<div className='loading' > <ClipLoader color="#FB6D33" loading={loading} size={100} /></div>)
          :
          (
            <Container>
            <Row>
              {productList.length > 0 ? (
                productList.map((product, index) => (
                  <Col md={3} sm={12} key={product._id}>
                    <ProductCard product={product} />
                  </Col>
                ))
              ) : (
                <div className="text-align-center empty-bag">
                  {name === "" ? (
                    <h2>No products registered.</h2>
                  ) : (
                    <h2>No products match {name}.</h2>
                  )}
                </div>
              )}
            </Row>
          </Container>
          )
      }
    </>

  );
};

export default ProductAll;