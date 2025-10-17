const express = require('express');
const app = express();
const connectDB = require('./configs/database');
const routers = require('./routers');
app.use(express.json());
app.use(express.static('./uploads'));

connectDB()
routers(app); 

app.listen(5003, () => {
  console.log('Server is running on port 5003');
});