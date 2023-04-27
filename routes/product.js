const express = require("express");
const {
  addProduct,
  updateProduct,
  deleteProduct,
  getOneProduct,
  getAllProduct,
} = require("../controllers/product.controller");
let router = express.Router();
////path + function controller
//add Product
router.post("/addProduct", addProduct);
// /////updateProduct
router.put("/updateProduct/:_id", updateProduct);
// /////deleteOneProduct
router.delete("/deleteOneProduct/:_id", deleteProduct);

// /////getOneProduct
router.get("/getOneProduct/:_id", getOneProduct);

///getAllProduct
router.get("/getAllProduct", getAllProduct);

module.exports = router;
