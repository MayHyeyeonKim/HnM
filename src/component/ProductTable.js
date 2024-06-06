import React, { useEffect } from "react";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { currencyFormat } from "../utils/number";
import { useState } from "react";
const ProductTable = ({ header, data, openEditForm }) => { //deleteItem,
  const [productlist, setProductlist] = useState([])
  // console.log("data", data)
  // console.log("productlist", productlist) //[]
  useEffect(()=>{
    if(data)
      setProductlist(data)
  },[data])
  const deleteItem = (id) => {
    //아이템 삭제하기 item._id
    let deleted_product_list = []
    deleted_product_list = data.filter((product)=>{
      if(product._id == id){
        return
      }
      return product
    })
    setProductlist(deleted_product_list)
  };
  return (
    <div className="overflow-x">
      <Table striped bordered hover>
        <thead>
          <tr>
            {header.map((title, index) => (
              <th key={index}>{title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {productlist.length > 0 ? (
            productlist.map((item, index) => (
              <tr key={index}>
                <th>{index}</th>
                <th>{item.sku}</th>
                <th style={{ minWidth: "100px" }}>{item.name}</th>
                <th>{currencyFormat(item.price)}</th>
                <th>
                  {Object.keys(item.stock).map((size, index) => (
                    <div key={index}>
                      {size}:{item.stock[size]}
                    </div>
                  ))}
                </th>
                <th>
                  <img src={item.image} width={100} alt="image" />
                </th>
                <th>{item.status}</th>
                <th style={{ minWidth: "100px" }}>
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => deleteItem(item._id)}
                    className="mr-1"
                  >
                    -
                  </Button>
                  <Button size="sm" onClick={() => openEditForm(item)}>
                    Edit
                  </Button>
                </th>
              </tr>
            ))
          ) : (
            <tr>No Data to show</tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};
export default ProductTable;
