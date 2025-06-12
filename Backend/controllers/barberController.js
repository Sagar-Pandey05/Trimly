const User = require("../models/User");

exports.getAllBarbers = async (req, res) => {
  try {
    const barbers = await User.find({ role: "barber" });
    res.json(barbers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
