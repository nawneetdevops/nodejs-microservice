const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('<h1>Demo app is running...</h1>');
 })


app.listen(port, ()=> {
  console.log(`Demo app is up and listening to port: ${port}`);
})
 