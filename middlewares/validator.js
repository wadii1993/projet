const { validationResult, check } = require("express-validator");

exports.registerRoules = () => [
  check("fullName", "this field is required").notEmpty(),
  check("email", "this field is required").notEmpty(),
  check("email", "this is not an email").isEmail(),
  check("password", "the password should be at least 6 caracters ").isLength({
    min: 6,
  }),
];

exports.validatorr = (req, res, next) => {
  const errors = validationResult(req);
  errors.isEmpty() ? next() : res.status(406).json({ errors: errors.array() });
};
