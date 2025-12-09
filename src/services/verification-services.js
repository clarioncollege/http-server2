const HttpExceptions = require("../config/http-exception");
const { updateUser, getUser } = require("./user-services");

const verifyEmail = async (verificationToken) => {
  const user = await getUser({ verificationToken });

  if (!user) {
    throw new HttpExceptions("Invalid verification token", 400);
  }

  if (user.verificationTokenExpiresIn < Date.now()) {
    throw new HttpExceptions("Verification token has expired", 400);
  }

  const updatedUser = await updateUser(
    { _id: user._id },
    {
      isVerified: true,
      verificationToken: null,
      verificationTokenExpiresIn: null,
    }
  );

  return updatedUser;
};

module.exports = { verifyEmail };
