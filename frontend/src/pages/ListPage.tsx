import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

interface Product {
  id: number;
  title: string;
  price: string;
}

interface Result {
  code: number;
  message: string;
  data: Product[];
}
interface DataType {
  key: string;
  id: string;
  title: string;
  price: string;
}
function ListPage() {
  const { sid } = useParams();
  const { cid } = useParams();

  const [result, setResult] = useState<Result>();
  const [items, setItems] = useState<Product[]>();
  const instance = axios.create({
    // baseURL: "http://localhost:8000",
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (sid != undefined) {
          console.log("Load sid: ", sid);
          const response = await instance.get(`/products/by_status/${sid}`);
          // console.log(response.data);
          setResult(response.data);
          setItems(response.data.data);
        } else if (cid != undefined) {
          console.log("Load cid: ", cid);
          const response = await instance.get(`/products/by_cate/${cid}`);
          // console.log(response.data);
          setResult(response.data);
          setItems(response.data.data);
        } else {
          console.log("Load all: ");
          const response = await instance.get("/products/");
          // console.log(response.data);
          setResult(response.data);
          setItems(response.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [location.pathname]);

  return (
    <>
      <ul className="list-group">
        {items?.map((item: Product) => (
          <li className="list-group-item" key={item.id}>
            <Link to={`/products/detail/${item.id}`}>{item.title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export default ListPage;
