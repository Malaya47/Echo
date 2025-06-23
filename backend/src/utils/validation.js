const validator = require("validator");
const validateSignupData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;
  if (!firstName || !lastName) {
    throw new Error("Name is not valid");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Email is not valid");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Please enter a strong password");
  }
};

const validateEditProfileData = (req) => {
  // TODO: Add more validation for each field using validator library
  const allowedEditFields = [
    "firstName",
    "lastName",
    "emailId",
    "age",
    "gender",
    "photoUrl",
    "about",
    "skills",
  ];
  const isEditAllowed = Object.keys(req.body).every((field) =>
    allowedEditFields.includes(field)
  );

  return isEditAllowed;
};

const validatePassowrdData = (req) => {
  const { currentPassword, newPassword } = req.body;

  if (
    !validator.isStrongPassword(newPassword) ||
    !validator.isStrongPassword(currentPassword)
  ) {
    throw new Error(
      "Password is weak and should contain at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 symbol"
    );
  }

  const allowedFields = ["currentPassword", "newPassword"];
  const isEditAllowed = Object.keys(req.body).every((field) =>
    allowedFields.includes(field)
  );

  return isEditAllowed;
};

const validateRequestData = (req) => {
  const toUserId = req.params.toUserId;
  const status = req.params.status;

  if (!toUserId && !status) {
    throw new Error("Invalid Request");
  }

  const allowedStatus = ["interested", "ignored"];
  if (!allowedStatus.includes(status)) {
    throw new Error("Invalid Status");
  }

  return true;
};

module.exports = {
  validateSignupData,
  validateEditProfileData,
  validatePassowrdData,
  validateRequestData,
};
