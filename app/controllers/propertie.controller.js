const Properties = require("../models/propertie.model.js");

// Create and Save a new Propertie
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Propertie
  const propertie = new Properties({

    id_pais: req.body.id_pais,
    id_ciudad : req.body.id_ciudad,
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    address:req.body.address,
    beds: req.body.beds,
    toileds: req.body.toileds,
    square : req.body.square
  });


  // Save Propertie in the database
  Properties.create(propertie, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Propertie."
      });
    else res.send(data);
  });
};

// Retrieve all propertie from the database.
exports.findAll = (req, res) => {
  Properties.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving propertie."
      });
    else res.send(data);
  });
};

// Find a single Propertie with a propertieId
exports.findOne = (req, res) => {
  Properties.findById(req.params.propertieId, (err, data) => {
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

  Properties.updateById(
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
  Properties.remove(req.params.propertieId, (err, data) => {
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
  Properties.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all propertie"
      });
    else res.send({ message: `All Propertie were deleted successfully!` });
  });
};
