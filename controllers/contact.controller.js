const contact = require("../models/Contact");

//add contact
exports.addContact = async (req, res) => {
  const { name, email, phone, adresse, subject } = req.body;
  try {
    const newContact = new contact({
      name,
      email,
      phone,
      adresse,
      subject,
    });
    await newContact.save();
    newContact
      ? res.status(200).json(newContact)
      : res.status(401).json({ msg: "create contact error" });
  } catch (error) {
    res.status(501).json({ msg: error.message });
  }
};

//get all contact
exports.getAllContact = async (req, res) => {
  try {
    const allContacts = await contact.find();
    allContacts
      ? res.status(201).json(allContacts)
      : res.status(401).json({ msg: "getAll contacts error" });
  } catch (error) {
    res.status(501).json({ msg: error.message });
  }
};
