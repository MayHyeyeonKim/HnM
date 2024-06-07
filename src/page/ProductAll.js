import React, { useEffect, useState } from "react";
import ProductCard from "../component/ProductCard";
import { Row, Col, Container } from "react-bootstrap";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { productActions } from "../action/productAction";
import ClipLoader from "react-spinners/ClipLoader";

const ProductAll = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.user.loading);
  const error = useSelector((state) => state.product.error);
  const searchKeyword = useSelector((state) => state.product.searchKeyword);
  console.log("ProductAll안의 searchKeyword", searchKeyword);
  const { productList, totalPageNum } = useSelector((state) => state.product);
  const [query, setQuery] = useSearchParams();
  const name = query.get("name");
  const page = query.get("page");

  //처음 로딩하면 상품리스트, 상품리스트 가져오기 (url쿼리 맞춰서)
  useEffect(() => {
    dispatch(productActions.getProductList({ name }));
  }, [query])

  useEffect(() => {
    //검색어나 페이지가 바뀌면 url바꿔주기 (검색어또는 페이지가 바뀜 => url 바꿔줌=> url쿼리 읽어옴=> 이 쿼리값 맞춰서  상품리스트 가져오기)

    // URLSearchParams 객체를 쿼리로 만들어줌
    const searchQuery = {
      page: query.get("page") || 1,
      name: query.get("name") || "",
    };
    const params = new URLSearchParams(searchQuery);
    const navigateQuery = params.toString();
    console.log("ProductAll안의 navigateQuery", navigateQuery);

    navigate("?" + navigateQuery);

  }, [name]);

  return (
    <>
      {
        loading ?
          (<div className='loading' > <ClipLoader color="#FB6D33" loading={loading} size={100} /></div>)
          :
          (
            // <Container>
            //   <Row>
            //     {productList?.map((product, index) =>
            //       <Col key={product._id} className="card" md={3} sm={12}>
            //         <ProductCard product={product} />
            //       </Col>
            //     )}
            //   </Row>
            // </Container>
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
                    <h2>등록된 상품이 없습니다!</h2>
                  ) : (
                    <h2>{name}과 일치한 상품이 없습니다!`</h2>
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