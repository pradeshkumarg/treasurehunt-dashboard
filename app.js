// init
const express = require('express');
var app = module.exports = express();
const cors = require('cors');

app.use(express.static(__dirname + "/public"));
app.use(cors());

const port = process.env.PORT || 9000;

app.listen(port, () => {
  console.log(`Everything works fine !! Server started in http://localhost:${port}`);
})