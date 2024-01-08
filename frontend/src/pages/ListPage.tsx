import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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

function ListPage() {
  const [result, setResult] = useState<Result>();
  const [items, setItems] = useState<Product[]>();
  const instance = axios.create({
    // baseURL: "http://localhost:8000",
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await instance.get("/products/");
        console.log(response.data);
        setResult(response.data);
        setItems(response.data.data);
      } catch (error) {}
    };
    fetchData();
  }, []);

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
