import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function MyOrder() {
  const [orderData, setOrderData] = useState(null);

  const fetchMyOrder = async () => {
    const res = await fetch("http://localhost:5000/api/auth/myOrderData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: localStorage.getItem("userEmail"),
      }),
    });

    const data = await res.json();
    setOrderData(data.orderData);
  };

  useEffect(() => {
    fetchMyOrder();
  }, []);

  return (
    <div>
      <Navbar />

      <div className="container">
        <div className="row">

          {!orderData ? (
            <h3 className="text-center mt-5">No Orders Found</h3>
          ) : (
            orderData.order_data
              .slice(0)
              .reverse()
              .map((order, index) => {
                const items = order[0];
                const orderDate = order[1];

                return (
                  <div key={index} className="mb-5">
                    {/* Order Date */}
                    <div className="m-auto mt-5">
                      <h5>{new Date(orderDate).toLocaleString()}</h5>
                      <hr />
                    </div>

                    <div className="row">
                      {items.map((item, idx) => (
                        <div
                          key={idx}
                          className="col-12 col-md-6 col-lg-3"
                        >
                          <div
                            className="card mt-3"
                            style={{ width: "16rem", maxHeight: "360px" }}
                          >
                            <img
                              src={item.img}
                              className="card-img-top"
                              alt={item.name}
                              style={{
                                height: "120px",
                                objectFit: "fill",
                              }}
                            />

                            <div className="card-body">
                              <h5 className="card-title">
                                {item.name}
                              </h5>

                              <div className="container w-100 p-0">
                                <span className="m-1">
                                  Qty: {item.qty}
                                </span>
                                <br />
                                <span className="m-1">
                                  Size: {item.size}
                                </span>
                                <br />
                                <span className="m-1">
                                  Price: ₹{item.price}/-
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
