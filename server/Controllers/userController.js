const users = require("../Model/userSchema");
const jwt = require("jsonwebtoken");
exports.login = async (req, res) => {
  const { phone, password } = req.body;
  try {
    const existingUser = await users.findOne({ phone, password });
    if (existingUser) {
      // generate token
      const token = jwt.sign(
        { userId: existingUser._id },
        process.env.jwt_secret
      );
      res.status(200).json({ existingUser, token });
    } else {
      res.status(406).json("invalid phone number or password");
    }
  } catch (err) {
    res.status(401).json(err);
  }
};

exports.register = async (req, res) => {
  const { name, email, phone, address, location, password } = req.body;
  const profilePicture = req.file.filename;
  try {
    const existingUser = await users.findOne({ phone });
    if (existingUser) {
      res.status(406).json("User with this phone number is already exist");
    } else {
      const newUser = new users({
        name,
        email,
        phone,
        address,
        location,
        profilePicture,
        password,
      });
      await newUser.save();
      res.status(200).json(newUser);
    }
  } catch (err) {
    res.status(401).json(err);
  }
};

exports.updateProfile = async (req, res) => {
  const { userId, name, email, phone, address, location } = req.body;
  const profilePicture = req?.file?.filename;

  try {
    if (profilePicture == undefined) {
      await users.findByIdAndUpdate(userId, {
        name,
        email,
        phone,
        address,
        location,
      });
    } else {
      await users.findByIdAndUpdate(userId, {
        name,
        email,
        phone,
        address,
        location,
        profilePicture,
      });
    }
    res.status(200).json("Profile Updated SuccessFully");
  } catch (err) {
    res.status(401).json(err);
  }
};

exports.getUserDeatils = async (req, res) => {
  const { userId } = req.body;
  try {
    const result = await users.find({ _id: userId });
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(401).json(error);
  }
};
