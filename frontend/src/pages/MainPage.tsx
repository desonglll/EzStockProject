import "bootstrap/dist/css/bootstrap.css";
import React from "react";
import MenuBar from "../components/MenuBar";
import ProductList from "../components/ProductList";
function MainPage() {
  return (
    <React.Fragment>
      <div className="container">
        <MenuBar />
        <ProductList />
      </div>
      {/* map测试 */}
      {/* <ul>
        {items.data.map((item) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul> */}
    </React.Fragment>
  );
}

export default MainPage;
