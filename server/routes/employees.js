const express = require("express");
const router = express.Router();

const { Employee, validator } = require("../models/employee");
const validate = require("../middleware/validate");
const isValidObjectId = require("../middleware/isValidObjectId");
const asyncHandler = require("../middleware/asyncHandler");

// Create an Employee
router.post(
  "/",
  validate(validator),
  asyncHandler(async (req, res) => {
    await Employee(req.body).save();

    res.status(200).send("Employee Created Sucessfully ");
  })
);

// Get all Employee
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const employees = await Employee.find();
    res.send(employees);
  })
);

// Get Employee by ID
router.get(
  "/:id",
  isValidObjectId,
  asyncHandler(async (req, res) => {
    const employee = await Employee.findById(req.params.id);
    res.send(employee);
  })
);

// Update Employee Details
router.put(
  "/:id",
  [isValidObjectId, validate(validator)],
  asyncHandler(async (req, res) => {
    await Employee.findByIdAndUpdate({ _id: req.params.id }, req.body);

    res.status(200).send("Updated Sucessuflly");
  })
);

// Delete Employee
router.delete(
  "/:id",
  isValidObjectId,
  asyncHandler(async (req, res) => {
    await Employee.findByIdAndDelete(req.params.id);
    res.status(200).send("Employee Deleted Sucessfully");
  })
);

module.exports = router;
