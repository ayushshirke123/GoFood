import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatchCart, useCart } from "./ContextReducer";

export default function Card(props) {
  const data = useCart();
  const dispatch = useDispatchCart();
  const navigate = useNavigate();

  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");
  const [imgError, setImgError] = useState(false);
  const [imgSrc, setImgSrc] = useState(props.ImgSrc || '');
  const priceRef = useRef();

  const options = props.options;
  const priceOptions = Object.keys(options);
  const foodItem = props.item;

  // 🔐 Redirect if not logged in
  const handleClick = () => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  };

  const handleQty = (e) => {
    setQty(Number(e.target.value));
  };

  const handleOptions = (e) => {
    setSize(e.target.value);
  };

  // 🧮 Safe price calculation
  const finalPrice = size ? qty * parseInt(options[size]) : 0;

  const handleAddToCart = async () => {
    let food = null;

    // 🔍 Check if item already exists in cart
    for (const item of data) {
      if (item.id === foodItem._id) {
        food = item;
        break;
      }
    }

    // 🛒 If item exists
    if (food) {
      // Same size → UPDATE
      if (food.size === size) {
        await dispatch({
          type: "UPDATE",
          id: foodItem._id,
          qty: qty,
          price: finalPrice,
        });
        return;
      }

      // Different size → ADD new item
      await dispatch({
        type: "ADD",
        id: foodItem._id,
        name: foodItem.name,
        qty: qty,
        size: size,
        price: finalPrice,
        img: props.ImgSrc,
      });
      return;
    }

    // 🆕 New item
    await dispatch({
      type: "ADD",
      id: foodItem._id,
      name: foodItem.name,
      qty: qty,
      size: size,
      price: finalPrice,
      img: props.ImgSrc,
    });
  };

  // ⏱️ Set default size on first render
  useEffect(() => {
    setSize(priceRef.current.value);
  }, []);

  // Update image source when props change
  useEffect(() => {
    if (props.ImgSrc) {
      setImgSrc(props.ImgSrc);
      setImgError(false);
    }
  }, [props.ImgSrc]);

  const handleImageError = () => {
    if (!imgError) {
      setImgError(true);
      // Use a placeholder image if the original fails to load
      setImgSrc('https://via.placeholder.com/300x200/cccccc/666666?text=No+Image');
    }
  };

  return (
    <div>
      <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px", backgroundColor: "#343a40", borderColor: "#495057" }}>
        <img
          src={imgSrc || 'https://via.placeholder.com/300x200/cccccc/666666?text=No+Image'}
          className="card-img-top"
          alt={props.foodName || "food"}
          style={{ height: "120px", objectFit: "cover", backgroundColor: "#f0f0f0" }}
          onError={handleImageError}
        />

        <div className="card-body" style={{ backgroundColor: "#343a40" }}>
          <h5 className="card-title" style={{ color: "white", fontWeight: "bold" }}>{props.foodName}</h5>

          <div className="container w-100 p-0" style={{ height: "38px" }}>
            {/* Quantity */}
            <select
              className="m-2 h-100 bg-success text-black rounded"
              onClick={handleClick}
              onChange={handleQty}
            >
              {Array.from({ length: 6 }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>

            {/* Size */}
            <select
              className="m-2 h-100 bg-success text-black rounded"
              ref={priceRef}
              onClick={handleClick}
              onChange={handleOptions}
            >
              {priceOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>

            {/* Price */}
            <div className="d-inline ms-2 fs-5" style={{ color: "white" }}>
              ₹{finalPrice}/-
            </div>
          </div>

          <hr style={{ borderColor: "#495057" }} />

          <button
            className="btn btn-success ms-2"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
