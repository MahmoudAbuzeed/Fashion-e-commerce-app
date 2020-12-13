const UserAddress = require("../../models/address");

class AddressService {
  async addAddress(payload) {
    if (payload.address) {
      if (payload.address._id) {
        const updateAddress = await UserAddress.findOneAndUpdate(
          { user: req.user._id, "address._id": payload.address._id },
          {
            $set: {
              "address.$": payload.address,
            },
          }
        );
        if (updateAddress) {
          return updateAddress;
        }
      } else {
        const newAddress = await UserAddress.findOneAndUpdate(
          { user: req.user._id },
          {
            $push: {
              address: payload.address,
            },
          },
          { new: true, upsert: true }
        );
        if (newAddress) {
          return newAddress;
        }
      }
    }
  }
  getAddress(userId) {
    const userAddress = UserAddress.findOne({ userId });
    if (userAddress) {
      return userAddress;
    }
  }
}

module.exports = AddressService;
