const Autos = require("../models/autos.model.js");

// Create and Save a new Propertie
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Propertie
  const auto = new Autos({
    id_pais: req.body.id_pais,
    id_ciudad : req.body.id_ciudad,
    marca : req.body.marca,
    modelo : req.body.modelo,
    precio :req.body.precio,
    descripcion : req.body.descripcion,
    matricula : req.body.matricula,
    estado : req.body.estado,
    anio : req.body.anio,
    km : req.body.km  
  });


  // Save Propertie in the database
  Autos.create(auto, (err, data) => {
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
  Autos.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving propertie."
      });
    else res.send(data);
  });
};

exports.findAllCity = (req, res) => {
  Autos.AllCiudad((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving City."
      });
    else res.send(data);
  });
};

// Find a single Propertie with a propertieId
exports.findOne = (req, res) => {
  Autos.findById(req.params.automovilId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Propertie with id ${req.params.automovilId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Propertie with id " + req.params.automovilId
        });
      }
    } else res.send(data);
  });
};

// Find a single Propertie with a propertieId
exports.findInnerJ = (req, res) => {
  Autos.findInerJoin(req.params.propertieId, (err, data) => {
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
// Find a single Propertie with a ciudadName
exports.findSearch = (req, res) => {
  Autos.searchById(req.params.ciudadName, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.send({
          status:0,
          message: `Not found Propertie with id ${req.params.ciudadName}.`
        });
      } else {
        res.send({
          status:0,
          message: "Error retrieving Propertie with id " + req.params.ciudadName
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

  Autos.updateById(
    req.params.propertieId,
    new Autos(req.body),
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
  Autos.remove(req.params.propertieId, (err, data) => {
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
Autos.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all propertie"
      });
    else res.send({ message: `All Propertie were deleted successfully!` });
  });
};
