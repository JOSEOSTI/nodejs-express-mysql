const Inmueble = require("../models/inmueble");

// Create and Save a new Propertie
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
    // Create a Propertie
    const inmueble = new Inmueble({
      nombre_inmueble: req.body.nombre_inmueble,
    
 
    });

  // Save Propertie in the database
  Inmueble.create(inmueble, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Propertie."
      });
    else res.send(data);
  });


};

exports.delete = (req, res) => {
  Inmueble.remove(req.params.inmuebleId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Propertie with id ${req.params.inmuebleId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Propertie with id " + req.params.inmuebleId
        });
      }
    } else res.send({ message: `Inmueble was deleted successfully!` });
  });
};