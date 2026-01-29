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
        const items = data[0] || [];
        const categories = data[1] || [];
        
        // Debug: Log category names and item category names
        console.log("Category names:", categories.map(c => c.CategoryName));
        console.log("Item category names:", [...new Set(items.map(i => i.CategoryName))]);
        
        // Debug: Count items per category
        categories.forEach(cat => {
          const count = items.filter(item => item.CategoryName === cat.CategoryName).length;
          console.log(`Category "${cat.CategoryName}": ${count} items`);
        });
        
        setFoodItem(items);
        setFoodCat(categories);
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
            <>
              {/* Show items grouped by category */}
              {foodCat.map((category) => {
                const categoryItems = foodItem.filter((item) => {
                  const categoryMatch = item.CategoryName && category.CategoryName &&
                    item.CategoryName.toLowerCase() === category.CategoryName.toLowerCase();
                  const searchMatch = search === '' || item.name.toLowerCase().includes(search.toLowerCase());
                  return categoryMatch && searchMatch;
                });
                
                if (categoryItems.length === 0) return null;
                
                return (
                  <div key={category._id} className='row mb-3'>
                    <div className='fs-3 m-3 text-white'>{category.CategoryName}</div>
                    <hr className='text-white' />
                    {categoryItems.map((filterItems) => {
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
                );
              })}
              
              {/* Show items that don't match any category */}
              {(() => {
                const matchedCategoryNames = new Set(
                  foodCat.map(cat => cat.CategoryName.toLowerCase())
                );
                const unmatchedItems = foodItem.filter((item) => {
                  const itemCategory = item.CategoryName ? item.CategoryName.toLowerCase() : '';
                  const hasMatch = matchedCategoryNames.has(itemCategory);
                  const searchMatch = search === '' || item.name.toLowerCase().includes(search.toLowerCase());
                  return !hasMatch && searchMatch;
                });
                
                if (unmatchedItems.length > 0) {
                  return (
                    <div className='row mb-3'>
                      <div className='fs-3 m-3 text-white'>Other Items</div>
                      <hr className='text-white' />
                      {unmatchedItems.map((filterItems) => {
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
                  );
                }
                return null;
              })()}
            </>
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
