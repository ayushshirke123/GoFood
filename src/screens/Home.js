import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar';
import Carousel from '../components/Carousal';
import Card from '../components/Card';
import { getApiBaseUrl } from '../config';

export default function Home() {
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);
  const [search, setSearch] = useState('');

  const loadData = async () => {
    try {
      const response = await fetch(`${getApiBaseUrl()}/api/auth/foodData`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log("Food data received:", data);
      console.log("Food items count:", data[0]?.length);
      console.log("Categories count:", data[1]?.length);
      
      if (data && Array.isArray(data) && data.length >= 2) {
        setFoodItem(data[0] || []);
        setFoodCat(data[1] || []);
      } else {
        console.error("Invalid data format:", data);
        setFoodItem([]);
        setFoodCat([]);
      }
    } catch (error) {
      console.error("Error loading food data:", error);
      setFoodItem([]);
      setFoodCat([]);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div style={{ marginTop: '56px' }}>
        <Carousel />
      </div>
      <div className='container' style={{ marginTop: '20px' }}>
        {foodItem.length > 0 ? (
          foodCat.length > 0 ? (
            // Show items grouped by category
            foodCat.map((category) => (
              <div key={category._id} className='row mb-3'>
                <div className='fs-3 m-3 text-white'>{category.CategoryName}</div>
                <hr className='text-white' />
                {foodItem
                  .filter((item) => item.CategoryName === category.CategoryName && 
                    (search === '' || item.name.toLowerCase().includes(search.toLowerCase())))
                  .map((filterItems) => {
                    // Handle different possible image field names
                    const imageUrl = filterItems.img || filterItems.image || filterItems.imgSrc || filterItems.ImgSrc || '';
                    return (
                      <div key={filterItems._id} className='col-12 col-md-6 col-lg-3'>
                        <Card
                          foodName={filterItems.name}
                          ImgSrc={imageUrl}
                          options={filterItems.options[0]}
                          item={filterItems}
                        />
                      </div>
                    );
                  })}
              </div>
            ))
          ) : (
            // Show all items if no categories
            <div className='row mb-3'>
              <div className='fs-3 m-3 text-white'>All Items</div>
              <hr className='text-white' />
              {foodItem
                .filter((item) => search === '' || item.name.toLowerCase().includes(search.toLowerCase()))
                .map((filterItems) => {
                  // Handle different possible image field names
                  const imageUrl = filterItems.img || filterItems.image || filterItems.imgSrc || filterItems.ImgSrc || '';
                  return (
                    <div key={filterItems._id} className='col-12 col-md-6 col-lg-3'>
                      <Card
                        foodName={filterItems.name}
                        ImgSrc={imageUrl}
                        options={filterItems.options[0]}
                        item={filterItems}
                      />
                    </div>
                  );
                })}
            </div>
          )
        ) : (
          <div className='text-center mt-5'>
            <h3>Loading food items...</h3>
          </div>
        )}
      </div>
    </div>
  );
}
