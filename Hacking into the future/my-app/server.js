const express = require('express');
const cors = require('cors');

const app = express();

// Enable CORS using cors package
app.use(cors());

// Your API routes here

app.listen(8080, () => {
  console.log('Server listening on port 8080');
});