const User = require("../models/User");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const secret = config.get("secret");

exports.register = async (req, res) => {
  const { fullName, email, password, adresse, userRole, telephone } = req.body;
  const existantUser = await User.findOne({ email });
  if (existantUser) res.status(409).json({ msg: "user already exsits" });
  try {
    ///add new user
    const newUser = new User({
      fullName,
      email,
      password,
      adresse,
      userRole,
      telephone,
    });

    ///cryptage password
    let salt = await bcryptjs.genSalt(10);
    let hash = await bcryptjs.hashSync(password, salt);
    newUser.password = hash;
    await newUser.save();
    ///json web token
    const payload = {
      _id: newUser._id,
      fullName: newUser.fullName,
      email: newUser.email,
      adresse: newUser.adresse,
      telephone: newUser.telephone,
    };
    let token = jwt.sign(payload, secret);
    res.send({
      token,
      user: {
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        adresse: newUser.adresse,
        telephone: newUser.telephone,
      },
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    //verification email
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ msg: "wrong informations" });
    //verification password

    const isMatch = await bcryptjs.compare(password, user.password);

    if (!isMatch) {
      return res.status(404).json({ msg: "wrong informations" });
    }

    const payload = {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      adresse: user.adresse,
      telephone: user.telephone,
      blocking: user.blocking,
    };
    let token = jwt.sign(payload, secret);
    res.send({
      token,
      user: {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        password: user.password,
        adresse: user.adresse,
        telephone: user.telephone,
        userRole: user.userRole,
        blocking: user.blocking,
      },
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

exports.auth = (req, res) => {
  res.send(req.user);
};
//////////////////////////////////////////////////////////////////////////////////////////////

/////get all user
// exports.getAllUser = async (req, res) => {
//     try {
//       const allUsers = await User.find();
//       allUsers
//         ? res.status(201).json(allUsers)
//         : res.status(401).json({ msg: "getAll error" });
//     } catch (error) {
//       res.status(501).json({ msg: error.message });
//     }
//   };

//   //edit user to bloking
//   exports.updateUser = async (req, res) => {
//     try {
//       const updateUser = await User.findByIdAndUpdate(
//         req.params._id,
//         { ...req.body },
//         { new: true }
//       );
//       res.status(204).send(updateUser);
//     } catch (error) {
//       res.status(504).json({ msg: error.message });
//     }
//   };
