const express = require("express");
const dotenv = require("dotenv");
const { connect } = require("./src/utils/db");
const app = express();
//* configurar dotenv*/
dotenv.config();
connect();
const PORT = process.env.PORT;

app.listen(PORT, () =>
  console.log(`Server listening on port 👌🔍 http://localhost:${PORT}`)
);
