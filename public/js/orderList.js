"use strict";

const e = React.createElement;
const { useState, useEffect } = React;

const OrderList = () => {
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState([]);

  useEffect(() => {
    setLoading(true);
    try {
      axios("/getSheetData")
        .then((res) => {
          setOrder(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <div id="orders">
      {loading && <h3 className="loading">Loading</h3>}
      {!loading && (
        <div className="order-container">
          <h3>Order List</h3>
          <div className="order-header">
            <span>Name</span>
            <span>Drink</span>
            <span>Size</span>
            <span>Sugar</span>
            <span>Ice</span>
            <span>Price</span>
          </div>
          {order.map((item, idx) => (
            <div className="order-list" key={idx}>
              <span>{item.name}</span>
              <span>{item.drink}</span>
              <span>{item.size}</span>
              <span>{item.sugar}</span>
              <span>{item.ice}</span>
              <span>{item.price}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// const domContainer = document.querySelector("#orders");
// const root = ReactDOM.createRoot(domContainer);
// root.render(<OrderList />);
