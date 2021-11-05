const  Users = require("../models/users.model.js");
const sql = require("../models/db.js");


// Create and Save a new Propertie
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a User
  const user = new Users({

    name: req.body.name,
    lastName : req.body.lastName,
    email :req.body.email,
    userName: req.body.userName,
    password : req.body.password
  
  });


  // Save Puser in the database
  Users.create(user, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the User."
      });
    else res.send(data);
  });
};

// Retrieve all propertie from the database.
exports.findAll = (req, res) => {
  Users.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving propertie."
      });
    else res.send(data);
  });
};
////*******login******* *//

  exports.login = (request, response )=>{
    var email = request.body.email;
    var password = request.body.password;
    if (email && password) {
      sql.query('SELECT * FROM usuario WHERE email = ? AND password = ?', [email, password], function(error, results, fields) {
        if (results.length > 0) {        
          response.send(results); 
        } else {
          response.send({status:0 , message:"Incorrect Username and/or Password!"});
        }			
        response.end();
      });
    } else {
      response.send('Please enter Username and Password!');
      response.end();
    }
  }

  
 
// Find a single Propertie with a propertieId
exports.findOne = (req, res) => {
 Users.findById(req.params.propertieId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Propertie with id ${req.params.propertieId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Propertie with id " + req.params.propertieId
        });
      }
    } else res.send(data);
  });
};


// Update a Propertie identified by the propertieId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Users.updateById(
    req.params.propertieId,
    new Properties(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Propertie with id ${req.params.propertieId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Propertie with id " + req.params.propertieId
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Customer with the specified customerId in the request
exports.delete = (req, res) => {
  Users.remove(req.params.propertieId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Propertie with id ${req.params.propertieId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Propertie with id " + req.params.propertieId
        });
      }
    } else res.send({ message: `Propertie was deleted successfully!` });
  });
};

// Delete all Propertie from the database.
exports.deleteAll = (req, res) => {
  Users.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all propertie"
      });
    else res.send({ message: `All Propertie were deleted successfully!` });
  });
};
