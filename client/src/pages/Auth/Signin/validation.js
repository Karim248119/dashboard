import Joi from "joi";

let validationMsgs = {
  email: {
    "string.email": "Email must be in a valid format (e.g., user@domain.com)",
    "string.empty": "Email is required",
  },

  password: {
    "string.pattern.base":
      "Password must be between 8 and 30 characters, containing only letters and numbers",
    "string.empty": "Password is required",
  },
};

export const schema = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .messages(validationMsgs.email),
  password: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9]{8,30}$"))
    .messages(validationMsgs.password),
}).options({ abortEarly: false });
