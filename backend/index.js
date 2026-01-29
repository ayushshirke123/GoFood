require('dotenv').config();

const express = require('express');
const mongoDB = require('./db');

const app = express();
const port = process.env.PORT || 5000;
const corsOrigin = process.env.CORS_ORIGIN || '*';

if (!process.env.MONGODB_URI) {
  console.error("Missing required env var: MONGODB_URI");
  process.exit(1);
}
if (!process.env.JWT_SECRET) {
  console.error("Missing required env var: JWT_SECRET");
  process.exit(1);
}

// 🌐 CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", corsOrigin);
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  
  next();
});

app.use(express.json());

// 🔌 Connect to DB and load food data
mongoDB((err, data, CatData) => {
  if (err) {
    console.log("❌ Error loading food data:", err);
  } else {
    global.foodData = data;
    global.foodCategory = CatData;
    console.log("🍔 Food data loaded");
    console.log(`   - Food items: ${data ? data.length : 0}`);
    console.log(`   - Categories: ${CatData ? CatData.length : 0}`);
  }
});

// 🏠 Test route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// 🔐 Auth routes
app.use('/api/auth', require('./Routes/Auth'));
app.use('/api', require('./Routes/DisplayData'));
app.use('/api', require('./Routes/CreateUsers'));

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
