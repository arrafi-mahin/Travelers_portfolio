const { uuid } = require("uuidv4");
const { validationResult } = require("express-validator");
const User = require("../Models/User");
const HttpError = require("../Models/http-error");

const DUMMY_USERS = [
  {
    id: "u1",
    name: "Mahin",
    email: "arrafi.mahin@gmail.com",
    password: "12345",
  },
  {
    id: "u2",
    name: "Rafi",
    email: "arrafi.mahin@hotmail.com",
    password: "54321",
  },
  {
    id: "u3",
    name: "Athiq",
    email: "arrafi.mahin@outlook.com",
    password: "22222",
  },
  {
    id: "u4",
    name: "Omar",
    email: "arrafi.mahin@yahoo.com",
    password: "22222",
  },
];

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
const getUserById = (req, res, next) => {
  const userId = req.params.uid;
  const user = DUMMY_USERS.filter((p) => {
    return p.id === userId;
  });
  res.json({ user });
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
      200
    );
    return next(error);
  } else {
  }
  const createUser = new User({
    name,
    email,
    image: "https://source.unsplash.com/random/300×300",
    password,
    places: [],
  });

  try {
    await createUser.save();
  } catch (err) {
    const errors = new HttpError("Signing up is faild.", 500);
    return next(errors);
  }

  res.status(201).json({ user: createUser.toObject({ getters: true }) });
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
  if (!user || user.password !== password) {
    const errors = new HttpError(
      "Login failed. Email and password not Match",
      401
    );
    return next(errors);
  }

  res.json(`${user.name} Welcome Back`);
};
exports.getUserList = getUserList;
exports.userSignUp = userSignUp;
exports.userLogin = userLogin;
exports.getUserById = getUserById;
