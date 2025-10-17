const { SECRET_KEY } = require("../configs/configuration");
const ErrorResponse = require("../helpers/ErrorResponse");
const accountModel = require("../model/account.model");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { registerAccountValid } = require("../validations/account.valid");
const sendMail = require("../helpers/sendMails");
module.exports = {
  login: async (req, res) => {
    const { username, password } = req.body;
    const account = await accountModel.findOne({ username });
    if (!account) {
      throw new ErrorResponse(401, "Sai tài khoản hoặc mật khẩu abc");
    }
    const checkPassword = bcryptjs.compareSync(password, account.password);

    if (!checkPassword) {
      throw new ErrorResponse(401, "Sai tài khoản hoặc mật khẩu");
    }

    //generate token
    const payload = {
      _id: account._id,
      username: account.username,
      role: account.role,
    };

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1d" });

    return res.status(200).json({ ...payload, jwt: token });
  },
  register: async (req, res) => {
    const body = req.body;
    console.log(body)

    const { error, value } = registerAccountValid(body);
    if (error) {
      throw new ErrorResponse(400, error.message);
    }
    const newAccount = await accountModel.create(value);

    const token = jwt.sign(
      { _id: newAccount._id, username: newAccount.username },
      process.env.SECRET_KEY,
      { expiresIn: "10m" }
    );

    sendMail({
      to: newAccount.email,
      subject: "Successfully Register",
      html: `
          <h1>Registered</h1>
          <p>Please click the link below to activate your account:</p>
          <a href="http://localhost:5003/api/auth/activate/${token}">Activate Account</a>
          <p>This link will expire in 10 minutes.</p>
        `,
    });

    return res.status(201).json(newAccount);

  },
  activeAccount: async (req, res) => {
    const { token } = req.params;

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    //verify token

    //update account isActive = true
    await accountModel.findByIdAndUpdate(decoded._id, { isActive: true });

    return res.status(200).json({ message: 'Account activated successfully' });
  },
};
