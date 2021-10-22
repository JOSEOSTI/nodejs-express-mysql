const Imagenes = require("../models/images.model.js");

// Create and Save a new Propertie
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
    // Create a Propertie
    const imagen = new Imagenes({
      img_url: req.body.img_url,
      img_datetime: req.body.img_datatime,
      img_principal: req.body.img_principal,
      img_enable: req.body.img_enable,
 
    });

  // Save Propertie in the database
  Imagenes.create(imagen, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Propertie."
      });
    else res.send(data);
  });

  // Find a single Propertie with a propertieId

};

exports.findAll = (req, res) => {
  Imagenes.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving propertie."
      });
    else res.send(data);
  });
};

// Find a single Propertie with a propertieId
exports.findOne= (req, res) => {
  Imagenes.findById(req.params.imagenId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Imagen with id ${req.params.imagenId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Imagen with id " + req.params.imagenId
        });
      }
    } else res.send(data);
  });
};

