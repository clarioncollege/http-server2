const { body, validationResult } = require("express-validator");
const HttpExceptions = require("../config/http-exception");

const userDataValidators = [
  body("firstName")
    .notEmpty()
    .withMessage("First name is required")
    .isLength({ min: 3, max: 20 })
    .withMessage("First name must be between 3 and 20 characters long"),
  body("lastName")
    .notEmpty()
    .withMessage("Last name is required")
    .isLength({ min: 3, max: 20 })
    .withMessage("Last name must be between 3 and 20 characters long"),
  body("email").isEmail().withMessage("Valid email is required"),
  body("password")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    )
    .withMessage(
      "Password must be at least 8 characters long and include one uppercase letter, one lowercase letter, one number, and one special character."
    ),
];

const userVerificationValidator = [
  body("verificationToken")
    .notEmpty()
    .withMessage("Verification token is required")
    .isLength({ min: 6, max: 6 })
    .withMessage("Verification token must be 6 characters long")
    .isNumeric()
    .withMessage("Verification token must be a number"),
];

const watchlistDataValidators = [
  body("movieTitle")
    .notEmpty()
    .withMessage("Movie title is required")
    .isString()
    .withMessage("Movie title must be a string"),
  body("movieId")
    .notEmpty()
    .withMessage("Movie ID is required")
    .isString()
    .withMessage("Movie ID must be a string"),
  body("ratings")
    .notEmpty()
    .withMessage("Ratings is required")
    .isNumeric()
    .withMessage("Ratings must be a number")
    .custom((value) => value >= 0 && value <= 10)
    .withMessage("Ratings must be between 0 and 10"),
  body("moviePoster")
    .notEmpty()
    .withMessage("Movie poster is required")
    .isString()
    .withMessage("Movie poster must be a string"),
];

const checkValidationResult = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new HttpExceptions(errors.errors[0].msg, 400);
  }

  next();
};

module.exports = {
  userDataValidators,
  userVerificationValidator,
  watchlistDataValidators,
  checkValidationResult,
};
