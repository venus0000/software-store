const { v4: uuidv4 } = require('uuid');
const crypto = require('crypto');

const jwt = require('jsonwebtoken');
const User = require('../models/User');

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      msg: 'Bad request. Please add email and password in the request body',
    });
  }

  let foundUser = await User.findOne({ email: req.body.email });
  if (foundUser) {
    const isMatch = await foundUser.comparePassword(password);

    if (isMatch) {
      const token = jwt.sign(
        { id: foundUser._id, name: foundUser.name },
        process.env.JWT_SECRET,
        {
          expiresIn: '30d',
        }
      );

      return res.status(200).json({ msg: 'user logged in', token });
    } else {
      return res.status(400).json({ msg: 'Bad password' });
    }
  } else {
    return res.status(400).json({ msg: 'Bad credentails' });
  }
};

const dashboard = async (req, res) => {
  const luckyNumber = Math.floor(Math.random() * 100);

  res.status(200).json({
    msg: `Hello, ${req.user.name}! Please buy my amazing app`,
    secret: `Today your lucky number is ${luckyNumber}`,
  });
};

const getAllUsers = async (req, res) => {
  let users = await User.find({});

  return res.status(200).json({ users });
};

const register = async (req, res) => {
  let foundUser = await User.findOne({ email: req.body.email });
  if (foundUser === null) {
    let { username, email, password } = req.body;
    if (username.length && email.length && password.length) {
      const person = new User({
        name: username,
        email: email,
        password: password,
      });
      await person.save();
      return res.status(201).json({ person });
    } else {
      return res
        .status(400)
        .json({ msg: 'Please add all values in the request body' });
    }
  } else {
    return res.status(400).json({ msg: 'Email already in use' });
  }
};

const generatelicense = async (req, res) => {
  let licenses = [];
  // const licenseKey = uuidv4();
  // const expiryDate = new Date();
  // expiryDate.setFullYear(expiryDate.getFullYear() + 1);

  const { machineId } = req.body;
  if (!machineId) {
    return res.status(400).json({ error: 'Machine ID is required' });
  }

  const hash = crypto.createHash('sha256');
  hash.update(machineId + process.env.SECRET_KEY);
  const uniquePart = hash.digest('hex');

  // Generate expiration date (1 year from now)
  const expirationDate = new Date();
  expirationDate.setFullYear(expirationDate.getFullYear() + 1);
  const expirationDateString = expirationDate.toISOString();

  // Combine unique part and expiration date to form the license key
  const licenseKey = `${uniquePart}:${expirationDateString}`;

  const newLicense = {
    licenseKey,
    expirationDate,
  };

  licenses.push(newLicense);
  return res.status(200).json({ licenseKey, expirationDate });
};

module.exports = {
  login,
  register,
  dashboard,
  getAllUsers,
  generatelicense,
};
