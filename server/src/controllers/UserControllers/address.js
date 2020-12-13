const AddressService = require("../../Services/UserServices/AddressService");

exports.addAddress = (req, res) => {
  const { payload } = req.body;
  const addressService = new AddressService();
  const addAddress = addressService.addAddress(payload);
  return res.status(201).json({ address: addAddress });
};

exports.getAddress = (req, res) => {
  const userId = req.user._id;
  const addressService = new AddressService();
  const getAddress = addressService.gatAddress(userId);
  return res.status(201).json({ address: getAddress });
};
