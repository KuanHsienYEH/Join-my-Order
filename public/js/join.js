"use strict";

const e = React.createElement;
const { useState, useEffect } = React;

const Join = () => {
  const [order, setOrder] = useState({
    name: "",
    drink: "",
    size: "",
    sugar: "",
    ice: "",
    price: "",
  });

  function hadleUpdate(e) {
    const { name, value } = e.target;
    setOrder((prevOrder) => {
      return {
        ...prevOrder,
        [name]: value,
      };
    });
  }
  function handleClick(e) {
    try {
      axios
        .post("/updateSheetData", order)
        .then((res) => {
          if (res.status == 200) {
            // update order list
            const container = document.getElementById("orders");
            const root = ReactDOM.createRoot(container);
            root.render(<OrderList />);
            //return <OrderList />;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <>
      <h4>join the order</h4>
      <div className="form">
        <input
          onChange={hadleUpdate}
          value={order.name}
          name="name"
          placeholder="Name"
        />
        <input
          onChange={hadleUpdate}
          value={order.drink}
          name="drink"
          placeholder="Drink"
        />
        <input
          onChange={hadleUpdate}
          value={order.size}
          name="size"
          placeholder="Size"
        />
        <input
          onChange={hadleUpdate}
          value={order.sugar}
          name="sugar"
          placeholder="Sugar"
        />
        <input
          onChange={hadleUpdate}
          value={order.ice}
          name="ice"
          placeholder="Ice"
        />
        <input
          onChange={hadleUpdate}
          value={order.price}
          name="price"
          placeholder="Price"
        />
        <button onClick={handleClick}>join</button>
      </div>
    </>
  );
};

// const domContainer = document.querySelector("#join");
// const root = ReactDOM.createRoot(domContainer);
// root.render(<Join />);
