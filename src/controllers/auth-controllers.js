const {
  authenthicateUser,
  getNewAccessToken,
} = require("../services/auth-services");
const ResponseHandler = require("../config/response-handler");

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const { accessToken, refreshToken } = await authenthicateUser(
      email,
      password
    );

    ResponseHandler.auth(res, "login success", { accessToken, refreshToken });
  } catch (error) {
    next(error);
  }
};

const generateNewAccessToken = async (req, res, next) => {
  try {
    const { userId } = req.user;

    const { accessToken } = await getNewAccessToken(userId);

    ResponseHandler.auth(res, "access token generated", { accessToken });
  } catch (error) {
    next(error);
  }
};

const logoutUser = async (req, res, next) => {
  try {
    ResponseHandler.logout(res, "logout success");
  } catch (error) {
    next(error);
  }
};

module.exports = { loginUser, logoutUser, generateNewAccessToken };
