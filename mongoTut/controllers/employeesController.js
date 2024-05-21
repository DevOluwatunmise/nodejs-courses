const Employee = require("../model/Employee")

// const getAllEmployees = async((req, res) => {})  
const getAllEmployees = async(req, res) => {
  const employees = await Employee.find()   // get all information/data about employee
  if(!employees) return res.status(204).json({"Message": "No employees found"});
  res.json(employees)
};

const createNewEmployee = async(req, res) => {
  if(!req?.body?.firstname || !req?.body?.lastname) {
    return res.status(400).json({"message": "Firstname and lastname are required! Thank you.😊"})
  }
  try {
    const result = await Employee.create({
      firstname: req.body.firstname,
      lastname: req.body.lastname
    });
    res.status(201).json(result)
  } catch (err) {
    console.log(err)
  }
};

const updateEmployee = async (req, res) => {
  if(!req?.body?.id) {      // to use ID to update an employee
    return res.status(400).json({message: "ID parameter is required"})
  }
  const employee = await Employees.findOne({_id: req.body.id}).exec()   // to use id to update, delete etc, we underscore _ID
  if (!employee) {
    return res.status(204)
      .json({ Message: `No Employee with the ID: ${req.body.id}`});
  }

  if (req.body.firstname) employee.firstname = req.body.firstname;
  if (req.body.lastname) employee.lastname = req.body.lastname;
  const result = await employee.save()
  res.json(result)

}
const deleteEmployee = async(req, res) => {
  if(!req?.body?.id) return res.status(400).json({message: "Employee ID is required"})
    constemployee = Employee.findOne({_id: req.body.id}).exec();

  if (!employee) {
    return res
      .status(204)
      .json({ Message: `No Employee matches ID: ${req.body.id} not foun` });

  }
  const result = await employee.deleteOne();
  res.json(result)
  
};

const getEmployee = async(req, res) => {
  if (!req?.parames?.id)
    return res.status(400).json({message: "Employee ID is required"});
  const employee = await Employee.findOne({_id: req.params.id}).exec();

  if (!employee) {
    return res
      .status(400)
      .json({ Message: `Employee with the ID: ${req.params.id} not found `});
  }

  res.json(employee);
};

module.exports = {
  getAllEmployees,
  createNewEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployee,
};