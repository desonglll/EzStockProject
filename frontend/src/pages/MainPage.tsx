import "bootstrap/dist/css/bootstrap.css";
import React from "react";
import ProductList from "../components/ProductList";
function MainPage() {
  return (
    <React.Fragment>
      <div className="container">
        <h1>MainPage</h1>
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
