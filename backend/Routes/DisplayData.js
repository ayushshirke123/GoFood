const express =require('express');
const router = express.Router();

router.post('/foodData',(req,res)=>{
    try {
        console.log("In food data route - DisplayData.js");
        console.log("Food data exists:", !!global.foodData);
        console.log("Category data exists:", !!global.foodCategory);
        console.log("Food data length:", global.foodData ? global.foodData.length : 0);
        console.log("Category data length:", global.foodCategory ? global.foodCategory.length : 0);
        
        // Return empty arrays if data not loaded yet, rather than error
        const foodData = global.foodData || [];
        const categoryData = global.foodCategory || [];
        
        res.json([foodData, categoryData]);
    } catch (error) {
        console.error("Error in foodData route:", error.message);
        res.status(500).json({ error: "Server Error", message: error.message });
    }
})

module.exports = router;