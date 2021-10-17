const mongoose = require("mongoose");
const Joi = require("joi");

const employeeSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
});

const Employee = mongoose.model("employee", employeeSchema);

const validator = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    mobile: Joi.string()
      .length(10)
      .regex(/^\d+$/)
      .message({ "string.pattern.base": "Plaese Enter Valid Mobile Number" })
      .required(),
  });

  return schema.validate(data);
};

module.exports = { Employee, validator };
