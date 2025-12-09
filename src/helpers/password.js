const { scrypt, randomBytes } = require("crypto");
const { promisify } = require("util");

const scryptAsync = promisify(scrypt);

/**
 * Hashes a password using scrypt algorithm.
 */
const hashPassword = async (password) => {
  const salt = randomBytes(16).toString("hex");
  const buf = await scryptAsync(password, salt, 64);

  return `${buf.toString("hex")}.${salt}`;
};

/**
 * Verifies a password against a hashed password.
 */
const verifyPassword = async (password, dbPassword) => {
  const [hashedPassword, salt] = dbPassword.split(".");

  const buf = await scryptAsync(password, salt, 64);

  return buf.toString("hex") === hashedPassword;
};

module.exports = { hashPassword, verifyPassword };
