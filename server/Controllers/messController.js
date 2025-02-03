const messes = require("../Model/messSchema");
const jwt = require("jsonwebtoken");

exports.messRegister = async (req, res) => {
  const {
    messName,
    phoneNumber,
    emailAddress,
    location,
    address,
    googleMapLink,
    homeDelivery,
    messDescription,
    password,
    subscriptionPlans,
    weeklyMenu,
  } = req.body;
  const messImage = req.file.filename;
  try {
    const existingMess = await messes.findOne({ phoneNumber });
    if (existingMess) {
      res.status(406).json("Mess with this phone number is already exist");
    } else {
      const newMess = new messes({
        messName,
        phoneNumber,
        emailAddress,
        location,
        address,
        googleMapLink,
        homeDelivery,
        messDescription,
        password,
        subscriptionPlans,
        weeklyMenu,
        messImage,
      });
      await newMess.save();
      res.status(200).json(newMess);
    }
  } catch (err) {
    res.status(401).json(err);
  }
};

exports.messLogin = async (req, res) => {
  const { phoneNumber, password } = req.body;
  try {
    const existingMess = await messes.findOne({ phoneNumber, password });
    if (existingMess) {
      // generate token
      const token = jwt.sign(
        { userId: existingMess._id },
        process.env.jwt_secret
      );
      res.status(200).json({ existingMess, token });
    } else {
      res.status(406).json("invalid phone number or password");
    }
  } catch (err) {}
};

exports.addMenu = async (req, res) => {
  const { messId, menuDetails } = req.body;

  try {
    const result = await messes.findByIdAndUpdate(messId, {
      weeklyMenu: menuDetails,
    });

    if (result) {
      res.status(200).json("Menu Added SuccessFully");
    } else {
      res.status(406).json("Menu Is Not Added!!!");
    }
  } catch (err) {
    res.status(401).json(err);
  }
};

exports.getMessDetails = async (req, res) => {
  const { messId } = req.body;

  try {
    const result = await messes.findOne({ _id: messId });
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(406).json("Menu Is Not Found!!!");
    }
  } catch (err) {
    console.log(err);
  }
};

exports.updateWeeklyMenu = async (req, res) => {
  const { messId, weeklyMenu } = req.body;

  try {
    const updatedMess = await messes.findByIdAndUpdate(
      messId,
      { weeklyMenu },
      { new: true }
    );
    if (!updatedMess)
      return res.status(404).json({ message: "Mess not found" });
    res.status(200).json(updatedMess);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updatePlans = async (req, res) => {
  const { messId, subscriptionPlans } = req.body;

  try {
    const updatedMess = await messes.findByIdAndUpdate(
      messId,
      { subscriptionPlans },
      { new: true }
    );
    if (!updatedMess)
      return res.status(404).json({ message: "Mess not found" });
    res.status(200).json(updatedMess);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.deleteMenu = async (req, res) => {
  const { messId } = req.body;
  try {
    const result = await messes.findOneAndUpdate(
      { _id: messId },
      { weeklyMenu: [] }
    );
    if (result) {
      res.status(200).json("Menu Deleted SuccesssFully");
    } else {
      res.status(406).json("Menu not Dleted");
    }
  } catch (err) {
    console.log(err);
  }
};

exports.getAllMesses = async (req, res) => {
  try {
    const result = await messes.find();
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
};

exports.updateMess = async (req, res) => {
  const {
    messId,
    messName,
    phoneNumber,
    emailAddress,
    address,
    location,
    messDescription,
    googleMapLink,
    homeDelivery,
  } = req.body;
  const messImage = req?.file?.filename;

  try {
    if (messImage == undefined) {
      await messes.findByIdAndUpdate(messId, {
        messName,
        phoneNumber,
        emailAddress,
        address,
        location,
        messDescription,
        googleMapLink,
        homeDelivery,
      });
    } else {
      await messes.findByIdAndUpdate(messId, {
        messName,
        phoneNumber,
        emailAddress,
        address,
        location,
        messDescription,
        googleMapLink,
        homeDelivery,
        messImage,
      });
    }
    res.status(200).json("Profile Updated SuccessFully");
  } catch (err) {
    res.status(401).json(err);
  }
};
