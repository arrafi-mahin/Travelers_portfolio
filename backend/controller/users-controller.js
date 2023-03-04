const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../Models/User");
const HttpError = require("../Models/http-error");

const getUserList = async (req, res, next) => {
  let users;
  try {
    users = await User.find({}, "-password");
  } catch (err) {
    const errors = new HttpError(
      "Something went wrong. please try after sometime",
      500
    );
    return next(errors);
  }
  res.json({ users: users.map((user) => user.toObject({ getters: true })) });
};
const getUserById = async (req, res, next) => {
  const userId = req.params.uid;
  let user;
  try {
    user = await User.findById(userId).exec();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong. please try after sometime",
      500
    );
  }
  res.json({ user: user.toObject({ getters: true }) });
};

const userSignUp = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError("Invalid input.", 422));
  }
  const { name, email, password } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const errors = new HttpError("email and password do not match", 500);
    return next(errors);
  }
  if (existingUser) {
    const error = new HttpError(
      "User exists already, please login instead.",
      422
    );
    return next(error);
  } else {
    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, 12);
    } catch (err) {

      const error = new HttpError(
        "Could not create user, please try again.",
        500
      );
      return next(error);
    }
    
    const createUser = new User({
      name,
      email,
      image: req.file.path,
      password: hashedPassword,
      places: [],
    });
    try {
      await createUser.save();
    } catch (err) {
      
      const errors = new HttpError("Signing up is failed.", 500);
      return next(errors);
    }

    let token;
    try {
      token = jwt.sign(
        { userId: createUser.id, email: createUser.email },
        process.env.JWT_KEY,
        { expiresIn: "1h" }
      );
    } catch (err) {
      const errors = new HttpError("Signing up is failed.", 500);
      return next(errors);
    }

    res
      .status(201)
      .json({ userId: createUser.id, email: createUser.email, token: token });
  }
};
const userLogin = async (req, res, next) => {
  const { email, password } = req.body;
  let user;
  try {
    user = await User.findOne({ email: email });
  } catch (err) {
    const errors = new HttpError("Login failed", 500);
    return next(errors);
  }
  if (!user) {
    const errors = new HttpError(
      "Login failed. Email and password not Match",
      403
    );
    return next(errors);
  }
  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, user.password);
  } catch (err) {
    const error = new HttpError(
      "Could not logged in, Please check your credentials and try again",
      500
    );
    return next(error);
  }
  if (!isValidPassword) {
    const errors = new HttpError(
      "Login failed. Email and password not Match",
      403
    );
    return next(errors);
  }
  let token;
  try {
    token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_KEY,
      { expiresIn: "1h" }
    );
  } catch (err) {
    const errors = new HttpError(
      "Login is failed. please try again later",
      500
    );
    return next(errors);
  }

  res.json({
    userId: user.id,
    email: user.email,
    token: token,
  });
};
exports.getUserList = getUserList;
exports.userSignUp = userSignUp;
exports.userLogin = userLogin;
exports.getUserById = getUserById;
