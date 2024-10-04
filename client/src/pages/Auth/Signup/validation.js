import Joi from "joi";

let validationMsgs = {
  username: {
    "string.alphanum": "Username must contain only letters and numbers",
    "string.min": "Username must be at least 3 characters long",
    "string.max": "Username must not exceed 30 characters",
    "string.empty": "Username is required",
  },
  email: {
    "string.email": "Email must be in a valid format (e.g., user@domain.com)",
    "string.empty": "Email is required",
  },
  phone_number: {
    "string.empty": "Phone number is required",
    "string.pattern.base": "please enter valid phone number",
  },
  address: {
    "string.empty": "Phone number is required",
    "string.base": "Phone number is required",
  },
  password: {
    "string.pattern.base":
      "Password must be between 8 and 30 characters, containing only letters and numbers",
    "string.empty": "Password is required",
  },
  confirmPass: {
    "any.only": "Password and confirmation must match",
    "string.empty": "Password confirmation is required",
  },
};

export const schema = Joi.object({
  username: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required()
    .messages(validationMsgs.username),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .messages(validationMsgs.email),
  phone_number: Joi.string()
    .required()
    .pattern(new RegExp("^[0-9]{11,15}$"))
    .messages(validationMsgs.phone_number),
  //google => +20 01012345667
  address: Joi.string().required().messages(validationMsgs.address),
  password: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9]{8,30}$"))
    .messages(validationMsgs.password),

  confirmPass: Joi.ref("password"),
})
  .options({ abortEarly: false })
  .messages(validationMsgs.confirmPass);
