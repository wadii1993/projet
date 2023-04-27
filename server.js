const express = require("express");
const connectDB = require("./config/connectDB");
const config = require("config");
const PORT = config.get("PORT");

const app = express();

app.use(express.json());

///user
const user = require("./routes/user");
app.use("/user", user);

//////product
const product = require("./routes/product");
app.use("/product", product);

//////contact
const contact = require("./routes/contact");
app.use("/contact", contact);

connectDB();
const port = PORT || 5000;
app.listen(7000, (err) =>
  err ? console.error(err) : console.log(`server is runnig on ${port}`)
);
