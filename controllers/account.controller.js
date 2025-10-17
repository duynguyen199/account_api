const accountModel = require("../model/account.model");

module.exports = {
  getAllAccounts: async (req, res) => {
    try {
      const accounts = await accountModel.find().select("-password"); // hide password field
      return res.status(200).json({
        total: accounts.length,
        accounts,
      });
    } catch (err) {
      throw new ErrorResponse(500, err.message || "Failed to fetch accounts");
    }
  },
};
