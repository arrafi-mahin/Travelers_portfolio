const { uuid } = require("uuidv4");
const { validationResult } = require("express-validator");
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

const getUserList = (req, res, next) => {
  const userInfo = DUMMY_USERS.map((u) => {
    let info = {
      id: u.id,
      name: u.name,
      email: u.email,
    };
    return info;
  });
  res.status(200).json(userInfo);
};
const getUserById = (req, res, next) => {
  const userId = req.params.uid;
  const user = DUMMY_USERS.filter((p) => {
    return p.id === userId;
  });
  res.json({ user });
};

const userSignUp = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError("Invalid input.", 422);
  }
  const { name, email, password } = req.body;
  const hasUser = DUMMY_USERS.find((u) => u.email === email);
  if (hasUser) {
    throw new HttpError("Email address already registered");
  }
  const newUser = {
    id: uuid(),
    name: name,
    email: email.toLowerCase(),
    password: password,
  };
  DUMMY_USERS.push(newUser);
  res.json(`${name} Signup is successful.`);
};
const userLogin = (req, res, next) => {
  const { email, password } = req.body;
  const user = DUMMY_USERS.find((u) => u.email === email);
  console.log(user);
  if (!user || user.password !== password) {
    throw new HttpError("email and password do not match", 404);
  }
  res.json(`${user.name} Welcome Back`);
};
exports.getUserList = getUserList;
exports.userSignUp = userSignUp;
exports.userLogin = userLogin;
