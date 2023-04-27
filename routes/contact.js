const express = require("express");
const {
  addContact,
  getAllContact,
} = require("../controllers/contact.controller");

let router = express.Router();

//add contact
router.post("/addContact", addContact);

///getAllContact
router.get("/getAllContact", getAllContact);

module.exports = router;
